import { Expose } from "class-transformer";
import { MuelleTurno } from "./arly-1-turno.entity";

export class DetalleTurno {
  @Expose()
  public readonly iddetalleturno: number;
  @Expose()
  public idturno: number;
  @Expose()
  public idactividad: number;
  @Expose()
  public descripcion: string;
  @Expose()
  public valorunidad: number;
  @Expose()
  public cantidad: number;
  @Expose()
  public cxv: number;
  @Expose()
  public porcentajedescuento: number;
  @Expose()
  public valordescuento: number;
  @Expose()
  public valoriva: number;
  @Expose()
  public subtotal: number;
  @Expose()
  public estado: string;
@Expose()
  public turno: MuelleTurno;
  constructor(
    iddetalleturno: number,
    idturno: number,
    idactividad: number,
    descripcion: string,
    valorunidad: number,
    cantidad: number,
    cxv: number,
    porcentajedescuento: number,
    valordescuento: number,
    valoriva: number,
    subtotal: number,
    estado: string,
    turno: MuelleTurno,
  ) {
    this.iddetalleturno = iddetalleturno;
    this.idturno = idturno;
    this.idactividad = idactividad;
    this.descripcion = descripcion;
    this.valorunidad = valorunidad;
    this.cantidad = cantidad;
    this.cxv = cxv;
    this.porcentajedescuento = porcentajedescuento;
    this.valordescuento = valordescuento;
    this.valoriva = valoriva;
    this.subtotal = subtotal;
    this.estado = estado;
    this.turno = turno;
  }
}