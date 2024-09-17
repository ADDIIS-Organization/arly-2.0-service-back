import { Expose } from 'class-transformer';
import { User, Role, Cedi } from './';

export class CediRoleUser {
  @Expose()
  public readonly id: number | null; // El ID es null hasta que se persista en la base de datos

  @Expose()
  public user: User;

  @Expose()
  public role: Role;

  @Expose()
  public cedi: Cedi;

  constructor(id: number | null, user: User, role: Role, cedi: Cedi) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.cedi = cedi;
  }

  // Método de fábrica para crear un nuevo CediRoleUser sin ID
  static create(user: User, role: Role, cedi: Cedi): CediRoleUser {
    return new CediRoleUser(null, user, role, cedi); // El ID se asignará cuando se persista
  }

  // Método para actualizar la relación (si hubiera campos modificables)
  updateRelation(user?: User, role?: Role, cedi?: Cedi): void {
    if (user) this.user = user;
    if (role) this.role = role;
    if (cedi) this.cedi = cedi;
  }
}
