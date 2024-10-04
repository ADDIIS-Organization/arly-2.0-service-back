import {
  BeforeApplicationShutdown,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  OnApplicationBootstrap,
  OnApplicationShutdown,
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
      imports: [ConfigModule], // Importa el módulo de configuración para poder acceder a las variables de entorno
      inject: [ConfigService], // Inyecta ConfigService para acceder a la configuración de la aplicación
      useFactory: (configService: ConfigService) => {
        // Crea una instancia del datasource central utilizando el servicio de configuración
        const centralDataSource = createCentralDataSource(configService);
        return centralDataSource.options; // Devuelve las opciones de configuración para TypeORM
      },
    }),
    CentralModule, // Módulo que maneja las funcionalidades del esquema central
    TenantModule, // Módulo que maneja las funcionalidades relacionadas con los tenants
  ],
})
export class AppModule
  implements
    OnModuleInit,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationBootstrap,
    OnApplicationShutdown
{
  constructor(private configService: ConfigService) {}

  // Método del ciclo de vida que se ejecuta cuando el módulo es inicializado
  onModuleInit() {
    console.log('AppModule initialized');
    // Muestra el nombre de la base de datos desde las variables de entorno
    console.log(
      `Database Name: ${this.configService.get<string>('DATABASE_NAME')}`,
    );
  }

  // Método del ciclo de vida que se ejecuta cuando la aplicación ha terminado de inicializar todos los módulos
  onApplicationBootstrap() {
    console.log('Application has fully bootstrapped');
    // Aquí podrías conectar servicios externos como por ejemplo brokers de mensajes
  }

  // Método del ciclo de vida que se ejecuta justo antes de que el módulo sea destruido
  onModuleDestroy() {
    console.log('AppModule will be destroyed');
    // Aquí podrías liberar recursos del módulo como por ejemplo cerrar conexiones a bases de datos
  }

  // Método del ciclo de vida que se ejecuta antes de que la aplicación comience el proceso de apagado
  beforeApplicationShutdown(signal: string) {
    console.log(`Application is shutting down with signal: ${signal}`);
    // Puedes preparar el entorno antes del apagado, por ejemplo, cerrando conexiones suavemente
  }

  // Método del ciclo de vida que se ejecuta justo antes de que la aplicación se apague completamente
  onApplicationShutdown(signal: string) {
    console.log(`Application shutdown complete with signal: ${signal}`);
    // Aquí se pueden liberar recursos finales, como cerrar archivos o desconectar servicios externos
  }
}
