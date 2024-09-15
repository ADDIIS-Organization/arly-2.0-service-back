import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserApplicationService } from '@/core/application/services';
import { UserController } from '../adapters/inbound/controllers';
import {
  CediUserRoleDomainService,
  UserDomainService,
} from '@/core/domain/services';
import { CediEntity, CediUserRoleEntity, RoleEntity, UserEntity } from '../persistence';
import { DatabaseSeederModule } from './';
import {
  CediRepositoryAdapter,
  CediUserRoleRepositoryAdapter,
  RoleRepositoryAdapter,
  UserRepositoryAdapter,
} from '../adapters/outbound/repositories';
import { SearchService } from '@/core/application/services/common/search.service';
import { TypeOrmSearchRepository } from '../adapters/outbound/repositories/common/typeorm-search.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Importar la entidad UserEntity
    TypeOrmModule.forFeature([CediUserRoleEntity]), // Importar la entidad CediUserRoleEntity
    TypeOrmModule.forFeature([CediEntity]), // Importar la entidad CediEntity
    TypeOrmModule.forFeature([RoleEntity]), // Importar la entidad UserEntity
    // forwardRef(() => DatabaseSeederModule), // Usar si el módulo DatabaseSeeder es necesario aquí
  ],
  controllers: [UserController], // Controladores que serán manejados por este módulo
  providers: [
    UserApplicationService, // Registrar UserApplicationService como proveedor directamente
    UserDomainService, // Registrar UserDomainService
    CediUserRoleDomainService,
    {
      provide: 'IUserRepositoryPort', // Token para el puerto del repositorio
      useClass: UserRepositoryAdapter, // Implementación del adaptador del repositorio
    },
    {
      provide: 'ICediUserRoleRepositoryPort', // Token para el puerto de la relación
      useClass: CediUserRoleRepositoryAdapter, // Implementación del adaptador de la relación
    },
    {
      provide: 'ICediRepositoryPort', // Token para el puerto del Cedi
      useClass: CediRepositoryAdapter, // Implementación del adaptador del Cedi
    },
    {
      provide: 'IRoleRepositoryPort', // Token para el puerto del rol
      useClass: RoleRepositoryAdapter, // Implementación del adaptador del rol
    },
    SearchService, // Registramos el servicio de búsqueda
    { provide: 'SearchRepository', useClass: TypeOrmSearchRepository }, // Inyectamos el repositorio de búsqueda
  ],
  exports: ['IUserRepositoryPort', 'ICediUserRoleRepositoryPort', UserApplicationService], // Exportar si se necesita en otros módulos
})
export class UserModule {}
