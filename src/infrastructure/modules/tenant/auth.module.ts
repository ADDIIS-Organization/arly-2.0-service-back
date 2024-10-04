import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/auth.controller';
import { AuthApplicationService } from '@/core/application/services/tenant/auth-application.service';
import { AuthHelperService } from '@/core/application/services/helpers/auth-helper.service';
import { TenantFactory } from '@/core/application/services/factories/tenant.factory';
import { JwtStrategy } from '@/core/application/strategies/jwt.strategy';
import { CentralUserModule } from '../central/central-user.module';
import { TenantSharedModule } from './tenant-shared.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    forwardRef(() => UserModule), // Importación con referencia circular para evitar dependencias cruzadas
    forwardRef(() => TenantSharedModule), // Importación con referencia circular para el módulo compartido entre tenants
    PassportModule, // Módulo de autenticación Passport para manejar estrategias de autenticación
    JwtModule.registerAsync({
      inject: [ConfigService], // Inyecta ConfigService para obtener las variables de entorno necesarias
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Obtiene el secreto JWT de las variables de entorno
        signOptions: { expiresIn: '1h' }, // Opciones para la firma del token JWT, especificando el tiempo de expiración
      }),
    }),
    CentralUserModule, // Módulo relacionado con usuarios centrales
  ],
  controllers: [AuthController], // Controlador que maneja las rutas relacionadas con la autenticación
  providers: [
    {
      provide: 'IAuthApplicationPort',
      useClass: AuthApplicationService,
    },
    JwtStrategy,
    TenantFactory,
    AuthHelperService,
  ],
})
export class AuthModule {}
