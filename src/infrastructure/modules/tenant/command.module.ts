import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';

import { CreateTenantCommand } from '@/infrastructure/adapters/inbound/cli';
import { TenantAdminService } from '@/core/application/services';

@Module({
  imports: [CommandModule],
  providers: [CreateTenantCommand, TenantAdminService],
  exports: [],
})
export class TenantCommandModule {}
