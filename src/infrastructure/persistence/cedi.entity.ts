import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CediUserRole } from './';

@Entity('cedis')
export class CediEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  municipio: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  email1: string;

  @Column()
  email2: string;

  @Column()
  supervisor: string;

  @Column()
  empresa: string;

  // One-to-Many relationship with CediUserRole
  @OneToMany(() => CediUserRole, (cediUserRole) => cediUserRole.cedi)
  cediUserRoles: CediUserRole[];
}
