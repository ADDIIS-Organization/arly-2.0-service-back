import { Expose } from 'class-transformer';
import { Role } from './role.entity';
import { MenuItem } from './menu-item.entity';

export class Permission {
  @Expose()
  public readonly role: Role; // Relación con Role

  @Expose()
  public readonly menuItem: MenuItem; // Relación con MenuItem

  @Expose()
  public canGet: boolean;

  @Expose()
  public canCreate: boolean;

  @Expose()
  public canUpdate: boolean;

  @Expose()
  public canDelete: boolean;

  constructor(
    role: Role,
    menuItem: MenuItem,
    canGet: boolean,
    canCreate: boolean,
    canUpdate: boolean,
    canDelete: boolean
  ) {
    this.role = role;
    this.menuItem = menuItem;
    this.canGet = canGet;
    this.canCreate = canCreate;
    this.canUpdate = canUpdate;
    this.canDelete = canDelete;
  }

  // Método de fábrica para crear una nueva Permission
  static create(role: Role, menuItem: MenuItem, canGet: boolean, canCreate: boolean, canUpdate: boolean, canDelete: boolean): Permission {
    return new Permission(role, menuItem, canGet, canCreate, canUpdate, canDelete);
  }

  // Método para actualizar permisos
  updatePermissions(canGet: boolean, canCreate: boolean, canUpdate: boolean, canDelete: boolean): void {
    this.canGet = canGet;
    this.canCreate = canCreate;
    this.canUpdate = canUpdate;
    this.canDelete = canDelete;
  }
}
