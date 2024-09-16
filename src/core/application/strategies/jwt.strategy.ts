import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { TenantContextService } from '../services/tenant';
import { JwtPayload } from '../ports/inbound';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tenantContextService: TenantContextService,
    configService: ConfigService,
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }


  async validate(payload: JwtPayload) {
    const { tenantSchema } = payload;
    if (!tenantSchema) {
      throw new UnauthorizedException('Tenant schema missing in token');
    }

    // Establecer el esquema del tenant
    this.tenantContextService.setTenantSchema(tenantSchema);

    // Devolver la información del usuario para adjuntarla a la solicitud
    return { userId: payload.sub, email: payload.email };
  }
}
