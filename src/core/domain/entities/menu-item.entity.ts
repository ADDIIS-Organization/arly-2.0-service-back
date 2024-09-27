import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Module } from './module.entity';

export class MenuItem {
  @Expose()
  public readonly id: number | null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public route: string; // Representa el path o URL

  @Expose()
  @IsOptional() // Puede ser null según el diagrama
  public menuId: number | null;

  @Expose()
  public readonly module: Module; // Relación con el módulo

  @Expose()
  public icon: string;

  constructor(id: number | null, name: string, route: string, menuId: number | null, module: Module, icon: string) {
    this.id = id;
    this.name = name;
    this.route = route;
    this.menuId = menuId;
    this.module = module;
    this.icon = icon;
  }

  // Método de fábrica para crear un nuevo MenuItem
  static create(name: string, route: string, module: Module, icon: string, menuId: number | null = null): MenuItem {
    return new MenuItem(null, name, route, menuId, module, icon);
  }

  // Método para actualizar MenuItem
  update(name?: string, route?: string, icon?: string): void {
    if (name) this.name = name;
    if (route) this.route = route;
    if (icon) this.icon = icon;
  }
}
