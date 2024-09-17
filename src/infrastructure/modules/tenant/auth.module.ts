import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthApplicationService } from '@/core/application/services/tenant';
import { JwtStrategy } from '@/core/application/strategies';
import { UserModule } from '.';
import { AuthController } from '@/infrastructure/adapters/inbound/http/controllers/central/auth.controller';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthApplicationService,
    JwtStrategy,
  ],
  exports: [AuthApplicationService],
})
export class AuthModule {}
