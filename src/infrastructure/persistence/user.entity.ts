import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CediUserRoleEntity } from './';

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

  // One-to-Many relationship with CediUserRoleEntity
  @OneToMany(() => CediUserRoleEntity, (cediUserRoleEntity) => cediUserRoleEntity.user)
  cediUserRoleEntities: CediUserRoleEntity[];
}
