import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ICediUserRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { JwtPayload } from '../ports/inbound/jwt-payload.interface';
import { UserApplicationService } from './user-application.service';
import { User } from '@/core/domain/entities/user.entity';
import { CediUserRole } from '@/core/domain/entities';

@Injectable()
export class AuthApplicationService {
  constructor(
    private userApplicationService: UserApplicationService,
    @Inject('ICediUserRoleRepositoryPort')
    private readonly cediUserRoleRepository: ICediUserRoleRepositoryPort,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user: User = await this.userApplicationService.getByUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: User): Promise<{ access_token: string }> {
    const cediUserRoleIds: CediUserRole[] = await this.cediUserRoleRepository.findByUserId(user.id);
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      cediUserRoleIds: cediUserRoleIds.map((cur) => cur.id),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
