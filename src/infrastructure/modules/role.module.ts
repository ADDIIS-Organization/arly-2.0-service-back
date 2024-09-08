import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleApplicationService } from '@/core/application/services';
import { RoleController } from '../adapters/inbound/controllers';
import { RoleDomainService } from '@/core/domain/services';
import { RoleRepositoryAdapter } from '../adapters';
import { RoleEntity } from '../persistence';
import { DatabaseSeederModule } from './';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => DatabaseSeederModule), // Only if DatabaseSeederModule is needed here
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryAdapter,
    },
    {
      provide: 'RoleService',
      useFactory: () => new RoleDomainService(),
      inject: ['RoleRepository'],
    },
    {
      provide: 'IRoleApplicationPort',
      useFactory: (roleService, roleRepository) =>
        new RoleApplicationService(roleService, roleRepository),
      inject: ['RoleService'],
    },
  ],
  exports: ['RoleRepository'],
})
export class RoleModule {}
