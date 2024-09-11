import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TenantRepositoryAdapter } from '../adapters/outbound/repositories/tenant-repository.adapter';
import { TenantAuthGuard } from '../../core/application/guards/tenant-auth.guard';
import { CediUserRoleEntity } from '../persistence/tenant/cedi-user-role.entity';
import { UserEntity } from '../persistence/tenant';
import { TenantEntity } from '../persistence/central';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TenantEntity, CediUserRoleEntity, UserEntity]),  // Importamos las entidades del tenant
  ],
  providers: [TenantRepositoryAdapter, TenantAuthGuard],  // Proveedores para el repositorio y guard de tenant
  exports: [TenantRepositoryAdapter],  // Exportamos para que esté disponible en otros módulos
})
export class TenantModule {}
