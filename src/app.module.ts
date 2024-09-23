import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { createCentralDataSource } from './infrastructure/database'; // DataSource del esquema central
import { CentralModule } from './infrastructure/modules/central';
import { TenantModule } from './infrastructure/modules/tenant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Conexión al esquema central: central_schema
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const centralDataSource = createCentralDataSource(configService);
        return centralDataSource.options;
      },
    }),
    CentralModule,
    TenantModule,
  ],
})
export class AppModule {}
