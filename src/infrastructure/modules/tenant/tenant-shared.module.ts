import { Module } from '@nestjs/common';

import { TenantRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant-repository.adapter';
import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';

@Module({
  providers: [
    TenantRepositoryAdapter,
    TenantContextService,
  ],
  exports: [
    TenantRepositoryAdapter,
    TenantContextService,
  ],
})
export class TenantSharedModule {}
