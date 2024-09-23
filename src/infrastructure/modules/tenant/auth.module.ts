import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/infrastructure/adapters/inbound/http/controllers/central';
import {
  AuthApplicationService,
  TenantContextService,
} from '@/core/application/services/tenant';
import { JwtStrategy } from '@/core/application/strategies';
import { CentralUserModule } from '../central';
import { TenantSharedModule, UserModule } from '.';

console.log('auth: ConfigModule', ConfigModule);
console.log('auth: UserModule', UserModule);
console.log('auth: PassportModule', PassportModule);
console.log('auth: JwtModule', JwtModule);
console.log('auth: CentralUserModule', CentralUserModule);
console.log('auth: TenantSharedModule', TenantSharedModule);

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    forwardRef(() => TenantSharedModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    CentralUserModule,
  ],
  controllers: [AuthController],
  providers: [AuthApplicationService, JwtStrategy],
  exports: [AuthApplicationService],
})
export class AuthModule {}
