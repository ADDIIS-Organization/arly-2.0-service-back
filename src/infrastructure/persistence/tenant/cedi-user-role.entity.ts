import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { UserEntity, RoleEntity, CediEntity } from '.';

@Entity('cedi_user_role')
export class CediUserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.cediUserRoleEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' }) // Aquí definimos la clave foránea en snake_case
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.cediUserRoleEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'role_id' }) // Aquí la clave foránea para el rol en snake_case
  role: RoleEntity;

  @ManyToOne(() => CediEntity, (cedi) => cedi.cediUserRoleEntities, {
    cascade: true,
  })
  @JoinColumn({ name: 'cedi_id' }) // Clave foránea para cedi en snake_case
  cedi: CediEntity;
}
