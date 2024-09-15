import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleApplicationService } from '@/core/application/services';
import { RoleController } from '../adapters/inbound/controllers';
import { RoleDomainService } from '@/core/domain/services';
import { RoleRepositoryAdapter } from '../adapters/outbound/repositories';
import { RoleEntity } from '../persistence';
import { DatabaseSeederModule } from './';
import { SearchService } from '@/core/application/services/common/search.service';
import { TypeOrmSearchRepository } from '../adapters/outbound/repositories/common/typeorm-search.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]), // Importar la entidad RoleEntity
    // forwardRef(() => DatabaseSeederModule), // Usar si el módulo DatabaseSeeder es necesario aquí
  ],
  controllers: [RoleController], // Controladores que serán manejados por este módulo
  providers: [
    RoleApplicationService, // Registrar RoleApplicationService como proveedor directamente
    RoleDomainService, // Registrar RoleDomainService
    {
      provide: 'IRoleRepositoryPort', // Token para el puerto del repositorio
      useClass: RoleRepositoryAdapter, // Implementación del adaptador
    },
    SearchService, // Registramos el servicio de búsqueda
    { provide: 'SearchRepository', useClass: TypeOrmSearchRepository }, // Inyectamos el repositorio de búsqueda
  ],
  exports: ['IRoleRepositoryPort', RoleApplicationService], // Exportamos si se usa en otros módulos
})
export class RoleModule {}

/**
 * Cuando se habla de Tokens en NestJS, se refiere a la inyección de dependencias.
 * Token es un string que se usa para identificar un proveedor o un módulo.
 * 
 * Aqui la inversión de control se hace a través de la inyección de dependencias.
 * A continuación se muestra un ejemplo de cómo se usa un token para identificar un proveedor.
 * 
 * En el archivo src/core/application/services/role-application.service.ts, se usa el token 'IRoleRepositoryPort' para identificar el puerto del repositorio.
 * 
 * @Injectable()
 * export class RoleApplicationService
 *  extends CrudApplicationService<
 *   Role,
 *  CreateRoleDto,
 * UpdateRoleDto,
 * RoleResponseDto
 * >
 * implements IRoleApplicationPort
 * {
 * constructor(
 * private readonly roleDomainService: RoleDomainService,
 * @Inject('IRoleRepositoryPort') // Usamos @Inject con el token del puerto
 * private readonly roleRepository: IRoleRepositoryPort,
 * ) {
 * super(roleRepository);
 * }
 * 
 */
