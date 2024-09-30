import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CentralRoleEntity } from '../../persistence/central/central-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CentralRoleEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class CentralRoleModule {}
