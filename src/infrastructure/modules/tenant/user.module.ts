import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CediEntity,
  CediRoleUserEntity,
  RoleEntity,
  UserEntity,
} from '@/infrastructure/persistence';
import {
  CediRepositoryAdapter,
  CediRoleUserRepositoryAdapter,
  RoleRepositoryAdapter,
  UserRepositoryAdapter,
} from '@/infrastructure/adapters/outbound/repositories';
import {
  CediRoleUserDomainService,
  UserDomainService,
} from '@/core/domain/services';
import { UserApplicationService } from '@/core/application/services/tenant';
import { UserController } from '@/infrastructure/adapters/inbound/http/controllers/tenant';
import { SearchService } from '@/core/application/services/common';
import { TypeOrmSearchRepository } from '@/infrastructure/adapters/outbound/repositories/common/typeorm-search.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CediRoleUserEntity,
      CediEntity,
      RoleEntity,
    ]), // Importar la entidad UserEntity
  ],
  controllers: [UserController], // Controladores que serán manejados por este módulo
  providers: [
    UserApplicationService, // Registrar UserApplicationService como proveedor directamente
    UserDomainService, // Registrar UserDomainService
    CediRoleUserDomainService,
    {
      provide: 'IUserRepositoryPort', // Token para el puerto del repositorio
      useClass: UserRepositoryAdapter, // Implementación del adaptador del repositorio
    },
    {
      provide: 'ICediRoleUserRepositoryPort', // Token para el puerto de la relación
      useClass: CediRoleUserRepositoryAdapter, // Implementación del adaptador de la relación
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
  exports: [
    'IUserRepositoryPort',
    'ICediRoleUserRepositoryPort',
    UserApplicationService,
  ],
})
export class UserModule {}
