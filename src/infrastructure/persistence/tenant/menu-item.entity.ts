import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ModuleEntity } from './module.entity';
import { PermissionEntity } from './permission.entity';

@Entity('menu_items')
export class MenuItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // El nombre del elemento del menú

  @Column()
  route: string; // La ruta o path que se usará para este menú

  // Relación Many-to-One con ModuleEntity (un menú pertenece a un módulo)
  @ManyToOne(() => ModuleEntity, (module) => module.menuItems, { eager: true })
  @JoinColumn({ name: 'module_id' })  // Nombre en snake_case para la clave foránea
  module: ModuleEntity;

  // Relación One-to-Many con PermissionEntity (un menú tiene varios permisos)
  @OneToMany(() => PermissionEntity, (permissionEntity) => permissionEntity.menuItem)
  permissionEntities: PermissionEntity[];

  // Relación Many-to-One recursiva (un menú puede tener un menú padre)
  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.children, { nullable: true })
  @JoinColumn({ name: 'parent_menu_item_id' })  // Nombre personalizado en snake_case
  parent: MenuItemEntity;

  // Relación One-to-Many recursiva (un menú puede tener varios submenús)
  @OneToMany(() => MenuItemEntity, (menuItem) => menuItem.parent)
  children: MenuItemEntity[];
}
