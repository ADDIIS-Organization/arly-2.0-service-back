import { PaginationDto } from "@/infrastructure/dtos/common";
import { MuelleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";


export interface IArlyApplicationPort {
  getById(id: number): Promise<MuelleTurnoResponseDto>;
  getAll(paginationDto: PaginationDto): Promise<MuelleTurnoResponseDto[]>;
}