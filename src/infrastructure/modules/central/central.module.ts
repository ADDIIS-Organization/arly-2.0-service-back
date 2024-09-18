// src/infrastructure/modules/central/central.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  CentralUserEntity,
  CentralRoleEntity,
  TenantEntity,
} from '../../persistence/central';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CentralUserEntity,
      CentralRoleEntity,
      TenantEntity,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class CentralModule {}
