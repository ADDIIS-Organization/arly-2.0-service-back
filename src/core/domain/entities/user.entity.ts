import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role, Cedi } from './';

export class User {
  @Expose()
  public readonly id: number | null; // El ID es null si no ha sido persistido

  private readonly _roles: Role[];
  private readonly _cedis: Cedi[];

  @Expose()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  public name: string;

  @Expose()
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @Expose()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  public username: string;

  @Expose()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  public password: string;

  constructor(
    id: number | null, // El ID es null si no ha sido persistido
    name: string,
    email: string,
    username: string,
    password: string,
    roles: Role[] = [],
    cedis: Cedi[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this._roles = roles;
    this._cedis = cedis;
  }

  @Expose()
  get roles(): Role[] {
    return [...this._roles]; // Retorna una copia para evitar modificaciones directas
  }

  @Expose()
  get cedis(): Cedi[] {
    return [...this._cedis]; // Retorna una copia para evitar modificaciones directas
  }

  // Método de fábrica para crear un nuevo usuario sin ID
  static create(name: string, email: string, username: string, password: string): User {
    if (!email.includes('@')) throw new Error('Invalid email format');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    return new User(null, name, email, username, password);
  }

  // Método para actualizar un usuario existente
  updateInfo(name?: string, email?: string, username?: string): void {
    if (name) this.name = name;
    if (email && email.includes('@')) this.email = email;
    else if (email) throw new Error('Invalid email format');
    if (username && username.length >= 3) this.username = username;
  }

  // Cambiar contraseña de forma controlada
  changePassword(newPassword: string): void {
    if (newPassword.length < 6) throw new Error('Password must be at least 6 characters long');
    this.password = newPassword;
  }

  // Métodos para gestionar roles
  assignRole(role: Role): void {
    if (this._roles.some(r => r.id === role.id)) throw new Error(`Role ${role.name} is already assigned to the user`);
    this._roles.push(role);
  }

  removeRole(role: Role): void {
    const index = this._roles.findIndex(r => r.id === role.id);
    if (index !== -1) this._roles.splice(index, 1);
  }

  // Métodos para gestionar cedis
  assignCedi(cedi: Cedi): void {
    if (this._cedis.some(c => c.id === cedi.id)) throw new Error(`Cedi ${cedi.name} is already assigned to the user`);
    this._cedis.push(cedi);
  }

  removeCedi(cedi: Cedi): void {
    const index = this._cedis.findIndex(c => c.id === cedi.id);
    if (index !== -1) this._cedis.splice(index, 1);
  }
}
