import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { RoleApplicationService } from '@/core/application/services';
import { RoleDomainService } from '@/core/domain/services';
import { RoleRepositoryAdapter } from '../adapters';
import { RoleController } from '../controllers/';
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
      useFactory: (roleRepository) => new RoleDomainService(roleRepository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleApplication',
      useFactory: (roleService) => new RoleApplicationService(roleService),
      inject: ['RoleService'],
    },
  ],
  exports: ['RoleRepository'],
})
export class RoleModule {}
