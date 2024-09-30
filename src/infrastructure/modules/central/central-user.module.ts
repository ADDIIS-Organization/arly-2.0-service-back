import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CentralUserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/central/central-user-repository.adapter';
import { CentralUserEntity } from '../../persistence/central/central-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CentralUserEntity])],
  providers: [CentralUserRepositoryAdapter],
  exports: [CentralUserRepositoryAdapter],
})
export class CentralUserModule {}
