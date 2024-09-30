import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { MenuItemEntity } from './menu-item.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, (role) => role.permissionEntities, { eager: true }) // Relación Many-to-One con RoleEntity
  @JoinColumn({ name: 'role_id' })  // Aquí definimos la clave foránea en snake_case
  role: RoleEntity;

  @ManyToOne(() => MenuItemEntity, (menuItem) => menuItem.permissionEntities, { eager: true }) // Relación Many-to-One con MenuItemEntity
  @JoinColumn({ name: 'menu_item_id' })  // Aquí definimos la clave foránea en snake_case
  menuItem: MenuItemEntity;

  @Column({ name: 'can_get', default: false, nullable: false })
  canGet: boolean;

  @Column({ name: 'can_create', default: false, nullable: false })
  canCreate: boolean;

  @Column({ name: 'can_update', default: false, nullable: false })
  canUpdate: boolean;

  @Column({ name: 'can_delete', default: false, nullable: false })
  canDelete: boolean;
}
