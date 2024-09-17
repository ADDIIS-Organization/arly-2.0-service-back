import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role, Cedi } from './';
import { CediRoleUserEntity } from '@/infrastructure/persistence';

export class User {
  @Expose()
  public readonly id: number | null; // El ID es null si no ha sido persistido

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

  // Contraseña, ya debe ser hasheada antes de llegar aquí
  public password: string;

  public CediRoleUserEntities: CediRoleUserEntity[];

  constructor(
    id: number | null,
    name: string,
    email: string,
    username: string,
    password: string, // La contraseña ya debe estar hasheada
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  // Método de fábrica para crear un usuario
  static create(
    name: string,
    email: string,
    username: string,
    password: string,
  ): User {
    if (!email.includes('@')) throw new Error('Invalid email format');
    return new User(null, name, email, username, password); // Contraseña ya está hasheada
  }

  // Método para actualizar la información del usuario
  updateInfo(name?: string, email?: string, username?: string): void {
    if (name) this.name = name;
    if (email && email.includes('@')) this.email = email;
    else if (email) throw new Error('Invalid email format');
    if (username && username.length >= 3) this.username = username;
  }
}
