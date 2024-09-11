import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CediUserRoleEntity, PermissionEntity } from '..';
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // One-to-Many relationship with CediUserRole
  @OneToMany(() => CediUserRoleEntity, (cediUserRoleEntity) => cediUserRoleEntity.role)
  cediUserRoleEntities: CediUserRoleEntity[];

  // One-to-Many relationship with PermissionEntity
  @OneToMany(() => PermissionEntity, (permissionEntity) => permissionEntity.role)
  permissionEntities: PermissionEntity[];
}