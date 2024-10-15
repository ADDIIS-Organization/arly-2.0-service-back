import {
  Arly1SedeEntity,
  DetalleTurnoEntity,
  EmpleadoEntity,
  MuelleColaboradorTurnoEntity,
} from '@/infrastructure/persistence/tenant/arly1';
import { Expose } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class MuelleTurno {
  @Expose()
  public readonly idturno: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idcliente: number | null;

  @Expose()
  @IsOptional()
  @IsString()
  public nombrecliente: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public direccioncliente: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public telefono: string | null;

  @Expose()
  @IsOptional()
  @IsEmail()
  public email: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public tipopago: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public observacion: string | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idtipoactividad: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public cantidadcolaborador: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public minutos: number | null;

  @Expose()
  public fechainicio: Date | null;

  @Expose()
  @IsOptional()
  @IsString()
  public horainicio: string | null;

  @Expose()
  public fechafin: Date | null;

  @Expose()
  @IsOptional()
  @IsString()
  public horafin: string | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public valoriva: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public porcentajeretencion: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public valorretencion: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public porcentajereteica: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public valorreteiva: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public valordescuento: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public subtotal: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public total: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idclienteinventario: number | null;

  @Expose()
  @IsOptional()
  @IsString()
  public nombreclienteinventario: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public direccionclienteinventario: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public telefonoclienteinventario: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public placa: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public nombreconductor: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  public telefonoconductor: string | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idusuarioregistra: number | null;

  @Expose()
  public fecharegistro: Date | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idusuariocierra: number | null;

  @Expose()
  public fechacierre: Date | null;

  @Expose()
  @IsOptional()
  @IsString()
  public estado: string | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idempresa: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idsede: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idagenda: number | null;

  @Expose()
  public fechainicioreal: Date | null;

  @Expose()
  public fechaanulacion: Date | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idmuelle: number | null;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idformapago_eliminar: number | null;

  @Expose()
  public fechterminado: Date | null;

  @Expose()
  @IsOptional()
  @IsString()
  public horaterminado: string | null;

  @Expose()
  public sede: Arly1SedeEntity;
  @Expose()
  public colaboradores: EmpleadoEntity[];

  @Expose()
  public detalles: DetalleTurnoEntity[];
  constructor(
    idturno: number | null,
    idcliente: number | null,
    nombrecliente: string | null,
    direccioncliente: string | null,
    telefono: string | null,
    email: string | null,
    tipopago: string | null,
    observacion: string | null,
    idtipoactividad: number | null,
    cantidadcolaborador: number | null,
    minutos: number | null,
    fechainicio: Date | null,
    horainicio: string | null,
    fechafin: Date | null,
    horafin: string | null,
    valoriva: number | null,
    porcentajeretencion: number | null,
    valorretencion: number | null,
    porcentajereteica: number | null,
    valorreteiva: number | null,
    valordescuento: number | null,
    subtotal: number | null,
    total: number | null,
    idclienteinventario: number | null,
    nombreclienteinventario: string | null,
    direccionclienteinventario: string | null,
    telefonoclienteinventario: string | null,
    placa: string | null,
    nombreconductor: string | null,
    telefonoconductor: string | null,
    idusuarioregistra: number | null,
    fecharegistro: Date | null,
    idusuariocierra: number | null,
    fechacierre: Date | null,
    estado: string | null,
    idempresa: number | null,
    idsede: number | null,
    idagenda: number | null,
    fechainicioreal: Date | null,
    fechaanulacion: Date | null,
    idmuelle: number | null,
    idformapago_eliminar: number | null,
    fechterminado: Date | null,
    horaterminado: string | null,
    sede: Arly1SedeEntity | null,
    colaboradores: EmpleadoEntity[] | null,
    detalles: DetalleTurnoEntity[] | null,
  ) {
    this.idturno = idturno;
    this.idcliente = idcliente;
    this.nombrecliente = nombrecliente;
    this.direccioncliente = direccioncliente;
    this.telefono = telefono;
    this.email = email;
    this.tipopago = tipopago;
    this.observacion = observacion;
    this.idtipoactividad = idtipoactividad;
    this.cantidadcolaborador = cantidadcolaborador;
    this.minutos = minutos;
    this.fechainicio = fechainicio;
    this.horainicio = horainicio;
    this.fechafin = fechafin;
    this.horafin = horafin;
    this.valoriva = valoriva;
    this.porcentajeretencion = porcentajeretencion;
    this.valorretencion = valorretencion;
    this.porcentajereteica = porcentajereteica;
    this.valorreteiva = valorreteiva;
    this.valordescuento = valordescuento;
    this.subtotal = subtotal;
    this.total = total;
    this.idclienteinventario = idclienteinventario;
    this.nombreclienteinventario = nombreclienteinventario;
    this.direccionclienteinventario = direccionclienteinventario;
    this.telefonoclienteinventario = telefonoclienteinventario;
    this.placa = placa;
    this.nombreconductor = nombreconductor;
    this.telefonoconductor = telefonoconductor;
    this.idusuarioregistra = idusuarioregistra;
    this.fecharegistro = fecharegistro;
    this.idusuariocierra = idusuariocierra;
    this.fechacierre = fechacierre;
    this.estado = estado;
    this.idempresa = idempresa;
    this.idsede = idsede;
    this.idagenda = idagenda;
    this.fechainicioreal = fechainicioreal;
    this.fechaanulacion = fechaanulacion;
    this.idmuelle = idmuelle;
    this.idformapago_eliminar = idformapago_eliminar;
    this.fechterminado = fechterminado;
    this.horaterminado = horaterminado;
    this.sede = sede;
    this.colaboradores = colaboradores;
    this.detalles = detalles;
  }
}
