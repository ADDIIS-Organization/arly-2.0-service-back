import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Cedi, Role } from './';

@Entity('users')
export class User {
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

  // Many-to-Many with Role
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles', // Name of the join table
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  // Many-to-Many with Cedi
  @ManyToMany(() => Cedi)
  @JoinTable({
    name: 'user_cedis', // Name of the join table
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'cedi_id' },
  })
  cedis: Cedi[];
}