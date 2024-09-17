import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CediRoleUserEntity, PermissionEntity } from '..';
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // One-to-Many relationship with CediRoleUser
  @OneToMany(() => CediRoleUserEntity, (CediRoleUserEntity) => CediRoleUserEntity.role)
  CediRoleUserEntities: CediRoleUserEntity[];

  // One-to-Many relationship with PermissionEntity
  @OneToMany(() => PermissionEntity, (permissionEntity) => permissionEntity.role)
  permissionEntities: PermissionEntity[];
}