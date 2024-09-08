import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { CediUserRole } from './cedi-user-role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // One-to-Many relationship with CediUserRole
  @OneToMany(() => CediUserRole, (cediUserRole) => cediUserRole.user)
  cediUserRoles: CediUserRole[];
}
