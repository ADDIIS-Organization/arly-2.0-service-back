// src/infrastructure/database/tenant-data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BankReconciliationEntity } from '../persistence/tenant/bank-reconciliations.entity';
import { BankTransactionEntity } from '../persistence/tenant/bank-transactions.entity';
import { DarsecInvoiceEntity } from '../persistence/tenant/darsec-invoices.entity';
import { CediRoleUserEntity } from '../persistence/tenant/cedi-user-role.entity';
import { PermissionEntity } from '../persistence/tenant/permission.entity';
import { MenuItemEntity } from '../persistence/tenant/menu-item.entity';
import { ModuleEntity } from '../persistence/tenant/module.entity';
import { CediEntity } from '../persistence/tenant/cedi.entity';
import { RoleEntity } from '../persistence/tenant/role.entity';
import { UserEntity } from '../persistence/tenant/user.entity';
import { TaxEntity } from '../persistence/tenant/tax.entity';

export const createTenantDataSource = (schema: string, configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
    password: configService.get<string>('DATABASE_PASSWORD', ''),
    database: configService.get<string>('DATABASE_NAME', 'central_db'),
    schema: schema, // Cambia el esquema dinámicamente según el tenant
    entities: [
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
    ],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
  });
};
