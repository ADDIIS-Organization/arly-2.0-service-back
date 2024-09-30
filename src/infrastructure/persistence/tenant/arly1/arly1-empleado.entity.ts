import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MuelleColaboradorTurnoEntity } from "./arly1-muellecolaboradorturno.entity";
import { MuelleTurnoEntity } from "./arly1-muelleturno.entity";
@Entity('confempleado')
export class EmpleadoEntity {
  @PrimaryGeneratedColumn()
  idempleado: number;
  @Column()
  apellidos: string;

  @OneToMany(
    () => MuelleColaboradorTurnoEntity,
    (colaborador) => colaborador.empleado,
  )
  muelleColaboradorTurnos: MuelleColaboradorTurnoEntity[];

  @ManyToMany(() => MuelleTurnoEntity, (turno) => turno.colaboradores)
  turnos: MuelleTurnoEntity[];
}