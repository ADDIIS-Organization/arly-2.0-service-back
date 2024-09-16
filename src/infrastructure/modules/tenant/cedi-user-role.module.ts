import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CediUserRoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CediUserRoleEntity } from '@/infrastructure/persistence';

@Module({
  imports: [TypeOrmModule.forFeature([CediUserRoleEntity])],
  providers: [
    CediUserRoleRepositoryAdapter,
    {
      provide: 'ICediUserRoleRepositoryPort',
      useClass: CediUserRoleRepositoryAdapter,
    },
  ],
  exports: ['ICediUserRoleRepositoryPort', CediUserRoleRepositoryAdapter],
})
export class CediUserRoleModule {}
