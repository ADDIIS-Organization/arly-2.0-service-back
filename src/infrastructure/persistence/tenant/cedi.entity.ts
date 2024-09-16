import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CediUserRoleEntity } from '..';

@Entity('cedis') // Nombre de la tabla
export class CediEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  municipality: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ name: 'primary_email' })
  primaryEmail: string;

  @Column({ name: 'secondary_email', nullable: true })
  secondaryEmail: string; 

  @Column()
  supervisor: string;

  @Column()
  company: string;

  // One-to-Many relationship with CediUserRole
  @OneToMany(
    () => CediUserRoleEntity,
    (cediUserRoleEntity) => cediUserRoleEntity.cedi,
  )
  cediUserRoleEntities: CediUserRoleEntity[];
}
