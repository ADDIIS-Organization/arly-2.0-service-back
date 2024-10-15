import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { DetalleTurnoEntity } from './arly1-detalleturno.entity';
import { EmpleadoEntity } from './arly1-empleado.entity';
import { Arly1SedeEntity } from './arly1-sede.entity';


@Entity('muelleturno') // Nombre de la tabla
export class MuelleTurnoEntity {
  @PrimaryGeneratedColumn()
  idturno: number;

  @Column({ nullable: true })
  idcliente: number;

  @Column({ nullable: true })
  nombrecliente: string;

  @Column({ nullable: true })
  direccioncliente: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tipopago: string;

  @Column({ nullable: true })
  observacion: string;

  @Column({ nullable: true })
  idtipoactividad: number;

  @Column({ nullable: true })
  cantidadcolaborador: number;

  @Column({ nullable: true })
  minutos: number;
  @Column({ type: 'date', nullable: true })
  fechainicio: Date;

  @Column({ type: 'timetz', nullable: true }) // Uso de TIMETZ (Hora con zona horaria)
  horainicio: string;

  @Column({ type: 'date', nullable: true })
  fechafin: Date;

  @Column({ type: 'time', nullable: true }) // Uso de TIMETZ (Hora con zona horaria)
  horafin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valoriva: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  porcentajeretencion: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorretencion: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  porcentajereteica: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorreteiva: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valordescuento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ nullable: true })
  idclienteinventario: number;

  @Column({ nullable: true })
  nombreclienteinventario: string;

  @Column({ nullable: true })
  direccionclienteinventario: string;

  @Column({ nullable: true })
  telefonoclienteinventario: string;

  @Column({ nullable: true })
  placa: string;

  @Column({ nullable: true })
  nombreconductor: string;

  @Column({ nullable: true })
  telefonoconductor: string;

  @Column({ nullable: true })
  idusuarioregistra: number;

  @Column({ type: 'timestamp', nullable: true })
  fecharegistro: Date;

  @Column({ nullable: true })
  idusuariocierra: number;

  @Column({ type: 'timestamp', nullable: true })
  fechacierre: Date;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  idempresa: number;

  @Column({ nullable: true })
  idsede: number;

  @Column({ nullable: true })
  idagenda: number;

  @Column({ type: 'timestamp', nullable: true })
  fechainicioreal: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaanulacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  idmuelle: number;

  @Column({ nullable: true })
  idformapago_eliminar: number;

  @Column({ type: 'date', nullable: true })
  fechaterminado: Date;

  @Column({ type: 'time', nullable: true })
  horaterminado: string;

  @OneToMany(() => DetalleTurnoEntity, (detalle) => detalle.muelleTurno)
  detalles: DetalleTurnoEntity[];

  @ManyToMany(() => EmpleadoEntity, (empleado) => empleado.turnos, { cascade: true })
  @JoinTable({
    name: 'muellecolaboradorturno', // Nombre de la tabla pivote
    joinColumn: { name: 'idturno', referencedColumnName: 'idturno' },
    inverseJoinColumn: {
      name: 'idempleado',
      referencedColumnName: 'idempleado',
    },
  })
  colaboradores: EmpleadoEntity[];

  @ManyToOne(() => Arly1SedeEntity, (sede) => sede.muelleTurnos)
  @JoinColumn({ name: 'idsede' })
  sede: Arly1SedeEntity;
}
