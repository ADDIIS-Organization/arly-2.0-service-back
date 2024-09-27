import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class Role {
  @Expose()
  public readonly id: number | null; // El ID es null si no ha sido persistido

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Expose()
  public description: string;

  constructor(id: number | null, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  // Método de fábrica para crear un nuevo Role
  static create(name: string, description: string): Role {
    return new Role(null, name, description); // El ID es null hasta que se persista
  }

  // Método para actualizar la entidad Role
  update(name?: string, description?: string): void {
    if (name) this.name = name;
    if (description) this.description = description;
  }
}
