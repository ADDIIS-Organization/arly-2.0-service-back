import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import {
  ConsoleInputService,
  CreateTenantCommand,
  GuidGeneratorService,
  TenantNameBuilder,
} from '@/infrastructure/adapters/inbound/cli';
import { TenantAdminService } from '@/core/application/services';

@Module({
  imports: [CommandModule],
  providers: [
    CreateTenantCommand,
    TenantAdminService,
    ConsoleInputService,
    TenantNameBuilder,
    GuidGeneratorService,
  ],
  exports: [],
})
export class TenantCommandModule {}
