import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { PermissionApplicationService } from '../services/tenant';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Used to get metadata from the handler
    private permissionService: PermissionApplicationService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const user = this.jwtService.verify(token); // Extract user data from JWT

    const hasPermission = await this.permissionService.checkPermissions(user.roleId, requiredPermissions);
    return hasPermission;
  }
}
