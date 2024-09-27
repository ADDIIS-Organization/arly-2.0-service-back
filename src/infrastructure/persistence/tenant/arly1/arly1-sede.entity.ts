import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MuelleTurnoEntity } from "./arly1-muelleturno.entity";

@Entity('confsede')
export class Arly1SedeEntity {
  @PrimaryGeneratedColumn()
  idsede: number;
  @Column()
 descripcion: string;

  @OneToMany(() => MuelleTurnoEntity, (muelleTurno) => muelleTurno.sede)
  muelleTurnos: MuelleTurnoEntity[];
}