import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity, RoleEntity, CediEntity } from './';

@Entity('cedi_user_role')
export class CediUserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.cediUserRoles, { cascade: true })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.cediUserRoles, { cascade: true })
  role: RoleEntity;

  @ManyToOne(() => CediEntity, (cedi) => cedi.cediUserRoles, { cascade: true })
  cedi: CediEntity;
}
