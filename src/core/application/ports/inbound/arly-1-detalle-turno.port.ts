import { PaginationDto } from "@/infrastructure/dtos/common";
import { DetalleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";

export interface IArly1DetalleturnoPort {
  getById(id: number): Promise<DetalleTurnoResponseDto[]>;
  getAll(paginationDto: PaginationDto): Promise<DetalleTurnoResponseDto[]>;
}