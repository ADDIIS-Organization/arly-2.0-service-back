import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import { CreateTenantCommand } from '@/infrastructure/adapters/inbound/cli/create-tenant.command';
import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';
import { TenantAdminService } from '@/core/application/services/central/tenant-admin.service';
import { CediRoleUserModule } from './cedi-role-user.module';
import { TenantSharedModule } from './tenant-shared.module';
import { AuthModule } from './auth.module';
import { CediModule } from './cedi.module';
import { RoleModule } from './role.module';
import { UserModule } from './user.module';
import { ExcelFileModule } from './excel-file.module';
import { Arly1Module } from './arly-1.module';
import { BankTransactionModule } from './bank-transaction.module';

console.log('AuthModule:', AuthModule);
console.log('CediModule:', CediModule);
console.log('CediRoleUserModule:', CediRoleUserModule);
console.log('RoleModule:', RoleModule);
console.log('TenantSharedModule:', TenantSharedModule);
console.log('UserModule:', UserModule);
console.log('Arly1Module:', Arly1Module);
@Module({
  imports: [
    TenantSharedModule,
    // UserModule,
    CommandModule, // Módulo de comandos, es necesario para ejecutar comandos CLI
    CediModule,
    RoleModule,
    AuthModule,
    CediRoleUserModule,
    ExcelFileModule,
    Arly1Module,
    BankTransactionModule
  ],
  providers: [
    TenantContextService,
    CreateTenantCommand,
    TenantAdminService
  ],
})
export class TenantModule {}
