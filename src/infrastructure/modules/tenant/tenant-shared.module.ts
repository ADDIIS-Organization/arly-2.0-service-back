import { Module } from '@nestjs/common';

import { TenantRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { TenantContextService } from '@/core/application/services/tenant';

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
