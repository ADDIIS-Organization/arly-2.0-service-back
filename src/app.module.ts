import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RoleModule, UserModule } from './infrastructure/modules';
import { getDatabaseConfig } from './infrastructure/config';

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
    // ...getSeederModules(),
    RoleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
