import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionApplicationService } from '../services/tenant/permission-application.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Used to get metadata from the handler such as permissions
    private permissionService: PermissionApplicationService, // Service to handle permission checks
    private jwtService: JwtService, // Service to verify JWT tokens
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the required permissions for the current route from the metadata
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      // If no permissions are required, allow access
      return true;
    }

    // Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the JWT token from the authorization header
    const token = request.headers.authorization?.split(' ')[1];
    // Verify the token and extract the user information
    const user = this.jwtService.verify(token); // Extract user data from JWT

    // Check if the user has the necessary permissions
    const hasPermission = await this.permissionService.checkPermissions(user.roleId, requiredPermissions);
    return hasPermission; // Return true if the user has the required permissions, false otherwise
  }
}