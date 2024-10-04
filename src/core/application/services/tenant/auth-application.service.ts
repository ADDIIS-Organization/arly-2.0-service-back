import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CentralUserRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/central/central-user-repository.adapter';
import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { TenantEntity } from '@/infrastructure/persistence/central/tenant.entity';
import { IAuthApplicationPort } from '../../ports/inbound/auth-application.port';
import { JwtPayload } from '../../ports/inbound/jwt-payload.interface';
import { AuthHelperService } from '../helpers/auth-helper.service';
import { TenantFactory } from '../factories/tenant.factory';

@Injectable()
export class AuthApplicationService implements IAuthApplicationPort {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: CentralUserRepositoryAdapter,
    private readonly tenantFactory: TenantFactory,
    private readonly authHelperService: AuthHelperService,
  ) {}

  // Valida las credenciales del usuario y devuelve la entidad del usuario si es válido
  async validateUser(
    username: string,
    password: string,
  ): Promise<CentralUserEntity> {
    const user = await this.userRepository.findByEmailWithTenants(username);
    // Verifica si el usuario existe y si la contraseña es correcta
    if (
      user &&
      (await this.authHelperService.isPasswordValid(password, user.password))
    ) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // Inicia sesión para un usuario y genera un token JWT
  async login(user: CentralUserEntity, tenantId?: number) {
    // Utiliza el TenantFactory para determinar el tenant adecuado
    const tenant = this.tenantFactory.createTenant(user, tenantId);
    if (!tenant) {
      throw new UnauthorizedException(
        'El usuario no tiene tenants asignados o acceso denegado al tenant especificado',
      );
    }
    if (Array.isArray(tenant)) {
      // Si el usuario tiene múltiples tenants y no se proporcionó tenantId, devolver la lista de tenants
      return { tenants: tenant };
    }

    // Genera el token JWT con la información del usuario y del tenant
    const token = this.generateToken(user, tenant);
    return {
      access_token: token,
      tenant: {
        id: tenant.id,
        name: tenant.name,
      },
    };
  }

  // Genera un token JWT para el usuario, incluyendo la información del tenant
  private generateToken(user: CentralUserEntity, tenant: TenantEntity): string {
    const payload: JwtPayload = {
      sub: user.id, // ID del usuario
      email: user.email, // Email del usuario
      tenantId: tenant.id, // ID del tenant
      tenantSchema: tenant.name, // Nombre del tenant (schema)
    };
    return this.jwtService.sign(payload);
  }
}
