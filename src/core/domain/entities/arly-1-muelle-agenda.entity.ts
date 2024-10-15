import { Expose } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class MuelleAgenda {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  public idagenda: number;

  @Expose()
  @IsOptional()
  @IsDate()
  public fechaapertura: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  public fechacierre: Date;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idusuarioapertura: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idusuariocierre: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idempresa: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public idsede: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public totalcontado: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public totalcredito: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public totalgasto: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public totalconsignacion: number;

  constructor(
    idagenda: number,
    fechaapertura?: Date,
    fechacierre?: Date,
    idusuarioapertura?: number,
    idusuariocierre?: number,
    idempresa?: number,
    idsede?: number,
    totalcontado?: number,
    totalcredito?: number,
    totalgasto?: number,
    totalconsignacion?: number,
  ) {
    this.idagenda = idagenda;
    this.fechaapertura = fechaapertura || null;
    this.fechacierre = fechacierre || null;
    this.idusuarioapertura = idusuarioapertura || null;
    this.idusuariocierre = idusuariocierre || null;
    this.idempresa = idempresa || null;
    this.idsede = idsede || null;
    this.totalcontado = totalcontado || null;
    this.totalcredito = totalcredito || null;
    this.totalgasto = totalgasto || null;
    this.totalconsignacion = totalconsignacion || null;
  }
}
