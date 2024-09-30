import { IGenericRepositoryPort } from "./common/generic-repository.port";
import { Permission } from "../../entities/permission.entity";

export interface IPermissionRepositoryPort extends IGenericRepositoryPort<Permission> {
  /**
   * Recupera los permisos asociados a un rol por su ID.
   *
   * @param roleId - El ID del rol.
   * @returns Un objeto o array de permisos.
   */
  findByRoleId(roleId: number): Promise<Record<string, boolean>>;
}
