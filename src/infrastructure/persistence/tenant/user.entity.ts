import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';  // Importamos el usuario central

import { CediRoleUserEntity } from './';

@Entity('users')  // Esta tabla pertenece al esquema del inquilino
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación One-to-Many con CediRoleUserEntity
  @OneToMany(() => CediRoleUserEntity, (CediRoleUserEntity) => CediRoleUserEntity.user)
  CediRoleUserEntities: CediRoleUserEntity[];

  // Simplemente almacenar el ID del usuario central, sin crear una relación entre esquemas
  @Column({ nullable: true, name: 'central_user_id' })
  centralUserId: number;  // ID de referencia al usuario en el esquema central
}