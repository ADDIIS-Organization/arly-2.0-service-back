import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cedi')
export class Cedi {
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
}
