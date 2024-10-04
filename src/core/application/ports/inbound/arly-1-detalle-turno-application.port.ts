import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { DetalleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";

export interface IArly1DetalleturnoApplicationPort {
  /**
   * Retrieves a DetalleTurno by its ID.
   * @param id - The ID of the DetalleTurno to retrieve.
   * @returns A promise that resolves to an array of DetalleTurnoResponseDto.
   */
  getById(id: number): Promise<DetalleTurnoResponseDto[]>;

  /**
   * Retrieves all DetalleTurno entities with pagination.
   * @param paginationDto - The pagination details for retrieving DetalleTurno entities.
   * @returns A promise that resolves to an array of DetalleTurnoResponseDto.
   */
  getAll(paginationDto: PaginationDto): Promise<DetalleTurnoResponseDto[]>;
}