import { TypeOrmModule } from '@nestjs/typeorm';
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
import { TenantContextService } from '@/core/application/services/tenant';

@Module({
  imports: [
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
  providers: [TenantContextService],
  exports: [TypeOrmModule],
})
export class TenantModule {}
