import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { MenuItemEntity } from './'; // Importar la entidad MenuItem

@Entity('modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string; // El ícono que se muestra para el módulo en la interfaz

  // Relación One-to-Many con MenuItemEntity
  @OneToMany(() => MenuItemEntity, (menuItem) => menuItem.module)
  menuItems: MenuItemEntity[];
}
