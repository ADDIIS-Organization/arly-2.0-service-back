import {
  BeforeApplicationShutdown,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    CentralModule,
    TenantModule,
  ],
})
export class AppModule
  implements OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown
{
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    console.log('AppModule initialized');
    console.log(
      `Database Name: ${this.configService.get<string>('DATABASE_NAME')}`,
    );
  }

  onModuleDestroy() {
    console.log('AppModule will be destroyed');
  }

  beforeApplicationShutdown(signal: string) {
    console.log(`Application is shutting down with signal: ${signal}`);
  }
}
