import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { CreateTenantCommand } from '@/infrastructure/adapters/inbound/cli/create-tenant.command';
import { TenantAdminService } from '@/core/application/services/central/tenant-admin.service';
import { ConsoleInputService } from '@/infrastructure/adapters/inbound/cli/console-input.service';
import { TenantNameBuilder } from '@/infrastructure/adapters/inbound/cli/tenant-name-builder.service';
import { GuidGeneratorService } from '@/infrastructure/adapters/inbound/cli/guid-generator.service';

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
