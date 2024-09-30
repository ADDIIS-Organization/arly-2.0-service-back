import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CediRoleUserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/cedi-user-role-repository.adapter';
import { TypeOrmSearchRepository } from '@/infrastructure/adapters/outbound/repositories/common/typeorm-search.repository';
import { UserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/common/user-repository.adapter';
import { CediRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/cedi-repository.adapter';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/role-repository.adapter';
import { UserController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/user.controller';
import { UserApplicationService } from '@/core/application/services/tenant/user-application.service';
import { CediRoleUserDomainService } from '@/core/domain/services/cedi-user-role-domain.service';
import { CediRoleUserEntity } from '@/infrastructure/persistence/tenant/cedi-user-role.entity';
import { SearchService } from '@/core/application/services/common/search.service';
import { UserDomainService } from '@/core/domain/services/user-domain.service';
import { UserEntity } from '@/infrastructure/persistence/tenant/user.entity';
import { CediEntity } from '@/infrastructure/persistence/tenant/cedi.entity';
import { RoleEntity } from '@/infrastructure/persistence/tenant/role.entity';
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
