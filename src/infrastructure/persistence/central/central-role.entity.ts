import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { CentralUserEntity } from '.';

@Entity('central_roles')  // Roles específicos del esquema central
export class CentralRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => CentralUserEntity, (user) => user.roles)
  @JoinTable({
    name: 'central_role_user',  // Tabla de relación muchos a muchos
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: CentralUserEntity[];
}
