import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  BankReconciliationEntity,
  BankTransactionEntity,
  CediUserRoleEntity,
  CediEntity,
  DarsecInvoiceEntity,
  MenuItemEntity,
  ModuleEntity,
  PermissionEntity,
  RoleEntity,
  TaxEntity,
  UserEntity,
} from '@/infrastructure/persistence/tenant';
import { TenantContextService } from '@/core/application/services/tenant';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankReconciliationEntity,
      BankTransactionEntity,
      CediUserRoleEntity,
      CediEntity,
      DarsecInvoiceEntity,
      MenuItemEntity,
      ModuleEntity,
      PermissionEntity,
      RoleEntity,
      TaxEntity,
      UserEntity,
    ]),
    // Importar otros módulos específicos del tenant si es necesario
  ],
  providers: [TenantContextService],
  exports: [TypeOrmModule],
})
export class TenantModule {}
