import { MuelleTurnoResponseDto } from "./muelleturno-response.dto";

export class DetalleTurnoResponseDto {
  iddetalleturno: number;
  idturno: number;
  idactividad: number;
  descripcion: string;
  valorunidad: number;
  cantidad: number;
  cxv: number;
  porcentajedescuento: number;
  valordescuento: number;
  valoriva: number;
  subtotal: number;
  estado: string;
  turno?: MuelleTurnoResponseDto;
}