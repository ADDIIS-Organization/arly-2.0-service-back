import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class Module {
  @Expose()
  public readonly id: number | null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Expose()
  public icon: string;

  constructor(id: number | null, name: string, icon: string) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  // Método de fábrica para crear un nuevo Module
  static create(name: string, icon: string): Module {
    return new Module(null, name, icon); // El ID es null hasta que se persista
  }

  // Método para actualizar el módulo
  update(name?: string, icon?: string): void {
    if (name) this.name = name;
    if (icon) this.icon = icon;
  }
}
