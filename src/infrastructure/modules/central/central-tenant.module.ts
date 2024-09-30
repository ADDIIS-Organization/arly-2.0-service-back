// src/infrastructure/modules/central/central.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TenantEntity } from '../../persistence/central/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
})
export class CentralTenantModule {}

/**
 * TypeOrmModule.forFeature([TenantEntity]) importa el módulo TypeOrmModule y registra el repositorio de la entidad TenantEntity.
 * Esto se hace para que el repositorio esté disponible en el módulo CentralTenantModule y pueda ser inyectado en los servicios que lo necesiten.
 */
