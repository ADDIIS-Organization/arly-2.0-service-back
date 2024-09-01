import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from '../controllers/role.controller';
import { RoleRepositoryAdapter } from '../adapters/role-repository.adapter';
import { RoleDomainService } from '../../core/domain/services/role-domain.service';
import { RoleApplicationService } from '../../core/application/services/role-application.service';
import { RoleEntity } from '../persistence/role.entity';

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
