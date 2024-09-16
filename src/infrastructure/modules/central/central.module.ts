// src/infrastructure/modules/central/central.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  CentralUserEntity,
  CentralRoleEntity,
  TenantEntity,
  JobFailed,
} from '../../persistence/central';
import { TenantAdminService } from '@/core/application/services'

@Module({
  imports: [TypeOrmModule.forFeature([CentralUserEntity, CentralRoleEntity, TenantEntity, JobFailed])],
  providers: [TenantAdminService],
  exports: [TypeOrmModule],
})
export class CentralModule {}
