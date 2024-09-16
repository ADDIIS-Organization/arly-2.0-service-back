import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm';  // Importamos el usuario central

import { CentralUserEntity } from '../central';
import { CediUserRoleEntity } from './';

@Entity('users')  // Esta tabla pertenece al esquema del inquilino
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  additional_inquilino_info: string;  // Información específica del usuario para este inquilino

  // Relación One-to-Many con CediUserRoleEntity
  @OneToMany(() => CediUserRoleEntity, (cediUserRoleEntity) => cediUserRoleEntity.user)
  cediUserRoleEntities: CediUserRoleEntity[];

  // Relación Many-to-One con el usuario central (CentralUserEntity)
  @ManyToOne(() => CentralUserEntity, { nullable: true })
  @JoinColumn({ name: 'central_user_id' })  // Foreign key hacia el usuario central
  centralUser: CentralUserEntity;

  @Column({ nullable: true })
  centralUserId: number;  // ID de referencia al usuario en el esquema central
}
