import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { DetalleTurno } from "../../entities";

export interface IArly1DetalleturnoRepositoryPort {
  findById(id: number): Promise<DetalleTurno[]>;
  findAll(PaginationDto: PaginationDto): Promise<DetalleTurno[]>;
}