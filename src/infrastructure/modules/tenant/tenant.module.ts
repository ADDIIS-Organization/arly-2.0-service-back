import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import {
  BankReconciliationEntity,
  BankTransactionEntity,
  CediRoleUserEntity,
  CediEntity,
  DarsecInvoiceEntity,
  MenuItemEntity,
  ModuleEntity,
  PermissionEntity,
  RoleEntity,
  TaxEntity,
  UserEntity,
} from '@/infrastructure/persistence/tenant';
import { CreateTenantCommand } from '@/infrastructure/adapters/inbound/cli';
import { TenantContextService } from '@/core/application/services/tenant';
import { TenantAdminService } from '@/core/application/services';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { Arly1Module } from './arly-1.module';

@Module({
  imports: [
    CommandModule, // Importa el módulo de comandos, es necesario para ejecutar comandos CLI
    Arly1Module,
    TypeOrmModule.forFeature([
      BankReconciliationEntity,
      BankTransactionEntity,
      CediRoleUserEntity,
      CediEntity,
      DarsecInvoiceEntity,
      MenuItemEntity,
      ModuleEntity,
      PermissionEntity,
      RoleEntity,
      TaxEntity,
      UserEntity,
    ]),
  ],
  providers: [
    TenantContextService,
    CreateTenantCommand,
    TenantAdminService,
    {
      provide: 'IRoleRepositoryPort',
      useClass: RoleRepositoryAdapter,
    },
  ],
  exports: [TypeOrmModule],
})
export class TenantModule {}
