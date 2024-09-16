// src/infrastructure/database/tenant-data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
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
} from '../persistence/tenant';

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
      CediUserRoleEntity,
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
