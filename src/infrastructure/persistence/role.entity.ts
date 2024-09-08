import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CediEntity } from './cedi.entity';
import { CediUserRole } from './cedi-user-role.entity';
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // One-to-Many relationship with CediUserRole
  @OneToMany(() => CediUserRole, (cediUserRole) => cediUserRole.role)
  cediUserRoles: CediUserRole[];
}