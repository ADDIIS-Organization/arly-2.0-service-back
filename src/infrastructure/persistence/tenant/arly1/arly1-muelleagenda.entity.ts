import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Arly1SedeEntity } from './arly1-sede.entity';

@Entity('muelleagenda') // Nombre de la tabla
export class MuelleAgendaEntity {
  @PrimaryGeneratedColumn()
  idagenda: number;

  @Column({ nullable: true, type: 'timestamp' })
  fechaapertura: Date;

  @Column({ nullable: true, type: 'timestamp' })
  fechacierre: Date;

  @Column({ nullable: true })
  idusuarioapertura: number;

  @Column({ nullable: true })
  idusuariocierre: number;

  @Column({ nullable: true })
  idempresa: number;

  @Column({ nullable: true })
  idsede: number;

  @Column({ nullable: true })
  totalcontado: number;

  @Column({ nullable: true })
  totalcredito: number;

  @Column({ nullable: true })
  totalgasto: number;

  @Column({ nullable: true })
  totalconsignacion: number;

  @ManyToOne(() => Arly1SedeEntity, (sede) => sede.agendas)
  @JoinColumn({ name: 'idsede' })
  sede: Arly1SedeEntity;
}
