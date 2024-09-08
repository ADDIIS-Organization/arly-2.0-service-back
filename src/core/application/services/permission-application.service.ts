import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@/core/domain/ports/outbound/permission.repository';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async checkPermissions(roleId: number, requiredPermissions: string[]): Promise<boolean> {
    const permissions = await this.permissionRepository.findByRoleId(roleId);

    return requiredPermissions.every((perm) => permissions[perm] === true);
  }
}
