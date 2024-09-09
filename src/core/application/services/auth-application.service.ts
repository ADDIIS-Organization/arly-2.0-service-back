import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../ports/inbound/jwt-payload.interface';
import { User } from '@/core/domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserApplicationService } from './user-application.service';
import { UserResponseDto } from '@/infrastructure/dtos/user';

@Injectable()
export class AuthApplicationService {
  constructor(
    private userApplicationService: UserApplicationService,
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
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      cediUserRoleIds: user.cediUserRoleEntities.map((cur) => cur.id),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
