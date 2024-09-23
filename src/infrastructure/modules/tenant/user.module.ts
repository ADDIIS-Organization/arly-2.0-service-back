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
import { TypeOrmSearchRepository } from '@/infrastructure/adapters/outbound/repositories/common';
import { UserController } from '@/infrastructure/adapters/inbound/http/controllers/tenant';
import { UserApplicationService } from '@/core/application/services/tenant';
import { SearchService } from '@/core/application/services/common';
import { TenantSharedModule } from './tenant-shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CediRoleUserEntity,
      CediEntity,
      RoleEntity,
    ]), // Importar la entidad UserEntity
    TenantSharedModule, // Asegúrate de importar este módulo para proporcionar TenantRepositoryAdapter y TenantContextService
  ],
  controllers: [UserController],
  providers: [
    UserApplicationService,
    UserDomainService,
    CediRoleUserDomainService,
    {
      provide: 'IUserRepositoryPort',
      useClass: UserRepositoryAdapter,
    },
    {
      provide: 'ICediRoleUserRepositoryPort',
      useClass: CediRoleUserRepositoryAdapter,
    },
    {
      provide: 'ICediRepositoryPort',
      useClass: CediRepositoryAdapter,
    },
    {
      provide: 'IRoleRepositoryPort',
      useClass: RoleRepositoryAdapter,
    },
    { provide: 'SearchRepository', useClass: TypeOrmSearchRepository },
    SearchService,
  ],
  exports: [
    'IUserRepositoryPort',
    'ICediRoleUserRepositoryPort',
    UserApplicationService,
  ],
})
export class UserModule {}
