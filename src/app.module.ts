import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AuthModule, RoleModule, UserModule } from '@/infrastructure/modules';
import { getDatabaseConfig } from '@/infrastructure/config';
import { CediModule } from '@/infrastructure/modules/cedi.module';
import { CediUserRoleModule } from '@/infrastructure/modules/cedi-user-role.module';
import { RoleExceptionFilter } from '@/infrastructure/exceptions/role-exception.filter';
import { AllExceptionsFilter } from '@/infrastructure/exceptions/common/filters';


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
    CediModule,
    CediUserRoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RoleExceptionFilter, // Filtro específico
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // Filtro general
    },
  ],
})
export class AppModule {}
