import { IGenericRepositoryPort } from './common';
import { Permission } from '../../entities';

export interface IPermissionRepositoryPort extends IGenericRepositoryPort<Permission> {
  /**
   * Recupera los permisos asociados a un rol por su ID.
   *
   * @param roleId - El ID del rol.
   * @returns Un objeto o array de permisos.
   */
  findByRoleId(roleId: number): Promise<Record<string, boolean>>;
}
