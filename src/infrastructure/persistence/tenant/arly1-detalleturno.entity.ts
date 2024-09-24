import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MuelleTurnoEntity } from "./arly1-muelleturno.entity";

@Entity('muelledetalleturno')
export class DetalleTurnoEntity {
  @PrimaryGeneratedColumn()
  iddetalleturno: number;

  @Column()
  idturno: number;

  @Column()
  idactividad: number;

  @Column()
  descripcion: string;

  @Column()
  valorunidad: number;

  @Column()
  cantidad: number;

  @Column()
  cxv: number;

  @Column()
  porcentajedescuento: number;

  @Column()
  valordescuento: number;

  @Column()
  valoriva: number;

  @Column()
  subtotal: number;

  @Column()
  estado: string;

  @ManyToOne(() => MuelleTurnoEntity, (muelleTurno) => muelleTurno.detalles, {
    nullable: false,
  })
  @JoinColumn({ name: 'idturno' })
  muelleTurno: MuelleTurnoEntity;
}