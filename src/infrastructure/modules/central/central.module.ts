import { Module } from '@nestjs/common';

import { CentralRoleModule } from './central-role.module';
import { CentralTenantModule } from './central-tenant.module';
import { CentralUserModule } from './central-user.module';
@Module({
  imports: [
    CentralRoleModule,
    CentralUserModule,
    CentralTenantModule,
  ],
})
export class CentralModule {}
