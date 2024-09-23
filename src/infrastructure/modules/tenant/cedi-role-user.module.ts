import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CediRoleUserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CediRoleUserEntity } from '@/infrastructure/persistence';

@Module({
  imports: [TypeOrmModule.forFeature([CediRoleUserEntity])],
  providers: [
    CediRoleUserRepositoryAdapter,
    {
      provide: 'ICediRoleUserRepositoryPort',
      useClass: CediRoleUserRepositoryAdapter,
    },
  ],
  exports: ['ICediRoleUserRepositoryPort', CediRoleUserRepositoryAdapter],
})
export class CediRoleUserModule {}
