import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { createCentralDataSource } from './infrastructure/database/central-data-source';
import { CentralModule } from './infrastructure/modules/central/central.module';
import { TenantModule } from './infrastructure/modules/tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Importante para que las variables de entorno estén disponibles en toda la aplicación
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
    // AuthModule,
    CentralModule,
    TenantModule,
  ],
})
export class AppModule {}
