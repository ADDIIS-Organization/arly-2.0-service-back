import { Injectable } from '@nestjs/common';

import { IPermissionRepositoryPort } from '@/core/domain/ports/outbound';
@Injectable()
export class PermissionApplicationService {
  constructor(private permissionRepository: IPermissionRepositoryPort) {}

  async checkPermissions(roleId: number, requiredPermissions: string[]): Promise<boolean> {
    const permissions = await this.permissionRepository.findByRoleId(roleId);

    return requiredPermissions.every((perm) => permissions[perm] === true);
  }
}
