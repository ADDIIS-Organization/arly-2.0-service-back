import { getDatabaseConfig } from './infrastructure/config';
import { getSeederModules } from './infrastructure/utils';
import { RoleModule } from './infrastructure/modules';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is available here
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    ...getSeederModules(),
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
