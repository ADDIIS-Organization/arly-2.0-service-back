import { Module } from '@nestjs/common';

import { CentralRoleModule, CentralUserModule, CentralTenantModule } from './';

@Module({
  imports: [
    CentralRoleModule,
    CentralUserModule,
    CentralTenantModule,
  ],
})
export class CentralModule {}
