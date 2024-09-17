import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { UserEntity, RoleEntity, CediEntity } from '.';

@Entity('cedi_role_user')
export class CediRoleUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.CediRoleUserEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' }) // Aquí definimos la clave foránea en snake_case
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.CediRoleUserEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'role_id' }) // Aquí la clave foránea para el rol en snake_case
  role: RoleEntity;

  @ManyToOne(() => CediEntity, (cedi) => cedi.CediRoleUserEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'cedi_id' }) // Clave foránea para cedi en snake_case
  cedi: CediEntity;
}
