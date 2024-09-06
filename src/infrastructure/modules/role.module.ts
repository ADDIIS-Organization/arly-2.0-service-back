import { RoleApplicationService } from '@/core/application/services';
import { RoleController } from '../controllers/role.controller';
import { RoleDomainService } from '@/core/domain/services';
import { RoleRepositoryAdapter } from '../adapters';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../persistence';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
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
})
export class RoleModule {}
