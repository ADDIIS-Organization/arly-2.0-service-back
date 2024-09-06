import { databaseConfig } from './infrastructure/config';
import { Module } from '@nestjs/common';
import { RoleModule } from './infrastructure/modules/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), RoleModule],
})
export class AppModule {}
