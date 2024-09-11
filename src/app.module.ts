import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule, RoleModule, UserModule } from './infrastructure/modules';
import { CediModule, CediUserRoleModule } from './infrastructure/modules';
import { createCentralDataSource } from './infrastructure/database'; // DataSource del esquema central
import { TenantModule } from './infrastructure/modules/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Acceso global a las variables de entorno
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Aseguramos que ConfigModule esté disponible
      inject: [ConfigService],  // Inyectamos ConfigService para obtener la configuración
      useFactory: (configService: ConfigService) => {
        const centralDataSource = createCentralDataSource(configService);  // Inicializamos la conexión central
        return centralDataSource.options;
      },
    }),
    RoleModule,
    UserModule,
    CediModule,
    CediUserRoleModule,
    AuthModule,
    TenantModule,  // Módulo que manejará la lógica de tenants xd
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
