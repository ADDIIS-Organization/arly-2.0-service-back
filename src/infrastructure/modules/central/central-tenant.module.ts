// src/infrastructure/modules/central/central.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  TenantEntity,
} from '../../persistence/central';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantEntity,
    ]),
  ]
})
export class CentralTenantModule {}
