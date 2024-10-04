import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import { BankTransactionModule } from './bank-transaction.module';
import { CediRoleUserModule } from './cedi-role-user.module';
import { TenantSharedModule } from './tenant-shared.module';
import { TenantCommandModule } from './command.module';
import { ExcelFileModule } from './excel-file.module';
import { Arly1Module } from './arly-1.module';
import { AuthModule } from './auth.module';
import { CediModule } from './cedi.module';
import { RoleModule } from './role.module';

@Module({
  imports: [
    TenantSharedModule, // Módulo compartido entre todos los tenants
    TenantCommandModule, // Módulo de comandos para operaciones específicas del tenant
    CommandModule, // Módulo de comandos, necesario para ejecutar comandos CLI
    CediModule, // Módulo relacionado con la gestión de CEDI (Centros de Distribución)
    RoleModule, // Módulo encargado de gestionar los roles de usuarios
    AuthModule, // Módulo de autenticación para manejar la seguridad y los accesos
    CediRoleUserModule, // Módulo que relaciona usuarios con roles específicos en CEDI
    ExcelFileModule, // Módulo para manejar archivos Excel, importado dos veces por error
    ExcelFileModule, // Repetición innecesaria, debe eliminarse
    Arly1Module, // Módulo específico para funcionalidades relacionadas con Arly1
    BankTransactionModule, // Módulo para gestionar transacciones bancarias
  ],
})
export class TenantModule {}
