import * as bcrypt from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CediUserRole } from '@/core/domain/entities';
import { JwtPayload } from '../../ports/inbound';
import { User } from '@/core/domain/entities';
import { TenantContextService } from '.';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly tenantContextService: TenantContextService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    // Get the user repository for the current tenant
    const userRepository = await this.tenantContextService.getRepository(User);

    // Find the user in the tenant's schema
    const user: User = await userRepository.findOne({ where: { email: username } });

    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: User): Promise<{ access_token: string }> {
    // Get the CediUserRole repository for the current tenant
    const cediUserRoleRepository = await this.tenantContextService.getRepository(CediUserRole);

    // Find roles associated with the user in the tenant's schema
    const cediUserRoles: CediUserRole[] = await cediUserRoleRepository.find({
      where: { userId: user.id },
    });

    // Include the tenant schema in the JWT payload
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      cediUserRoleIds: cediUserRoles.map((cur) => cur.id),
      tenantSchema: this.tenantContextService.getTenantSchema(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
