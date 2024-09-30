import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MuelleTurnoEntity } from "./arly1-muelleturno.entity";
import { EmpleadoEntity } from "./arly1-empleado.entity";
@Entity('muellecolaboradorturno')
export class MuelleColaboradorTurnoEntity {
  @PrimaryGeneratedColumn()
  idturno: number;
  @PrimaryGeneratedColumn()
  idempleado: number;

  @ManyToOne(() => MuelleTurnoEntity, (turno) => turno.colaboradores)
  @JoinColumn({ name: 'idturno' })
  turno: MuelleTurnoEntity;

  @ManyToOne(() => EmpleadoEntity, (empleado) => empleado.turnos)
  @JoinColumn({ name: 'idempleado' })
  empleado: EmpleadoEntity;
}