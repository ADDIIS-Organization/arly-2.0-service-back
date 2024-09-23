import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import {
  AuthModule,
  CediModule,
  CediRoleUserModule,
  RoleModule,
  TenantSharedModule,
  UserModule,
} from './';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CreateTenantCommand } from '@/infrastructure/adapters/inbound/cli';
import { TenantContextService } from '@/core/application/services/tenant';
import { TenantAdminService } from '@/core/application/services';

console.log('AuthModule:', AuthModule);
console.log('CediModule:', CediModule);
console.log('CediRoleUserModule:', CediRoleUserModule);
console.log('RoleModule:', RoleModule);
console.log('TenantSharedModule:', TenantSharedModule);
console.log('UserModule:', UserModule);
@Module({
  imports: [
    TenantSharedModule,
    // UserModule,
    CommandModule, // Módulo de comandos, es necesario para ejecutar comandos CLI
    CediModule,
    RoleModule,
    AuthModule,
    CediRoleUserModule,
  ],
  providers: [
    TenantContextService,
    CreateTenantCommand,
    TenantAdminService
  ],
})
export class TenantModule {}
