import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { CediRoleUserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/cedi-user-role-repository.adapter';
import { CediRoleUserEntity } from '@/infrastructure/persistence/tenant/cedi-user-role.entity';
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
