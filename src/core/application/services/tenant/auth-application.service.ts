import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { TenantEntity } from '@/infrastructure/persistence/central/tenant.entity';
import { JwtPayload } from '../../ports/inbound';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(CentralUserEntity)
    private readonly userRepository: Repository<CentralUserEntity>,
  ) {}

  async validateUser(username: string, password: string): Promise<CentralUserEntity> {
    // Buscar el usuario en la base de datos central, incluyendo los tenants
    const user = await this.userRepository.findOne({
      where: { email: username },
      relations: ['tenants'],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: CentralUserEntity, tenantId?: number) {
    const userTenants = user.tenants;

    if (userTenants.length === 0) {
      throw new UnauthorizedException('El usuario no tiene tenants asignados');
    }

    let tenant: TenantEntity;

    if (tenantId) {
      // Verificar si el tenantId está entre los tenants del usuario
      tenant = userTenants.find((t) => t.id === tenantId);
      if (!tenant) {
        throw new UnauthorizedException('Acceso denegado al tenant especificado');
      }
    } else if (userTenants.length === 1) {
      // Usuario con un solo tenant
      tenant = userTenants[0];
    } else {
      // Usuario con múltiples tenants y no se proporcionó tenantId
      // Devolver la lista de tenants
      const tenants = userTenants.map((t) => ({
        id: t.id,
        name: t.name,
      }));
      return { tenants };
    }

    // Generar el token JWT incluyendo la información del tenant
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      tenantId: tenant.id,
      tenantSchema: tenant.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      tenant: {
        id: tenant.id,
        name: tenant.name,
      },
    };
  }
}
