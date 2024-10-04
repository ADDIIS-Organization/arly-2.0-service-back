import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { MuelleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";

export interface IArlyApplicationPort {
  /**
   * Retrieves a MuelleTurno by its ID.
   * @param id - The ID of the MuelleTurno to retrieve.
   * @returns A promise that resolves to the MuelleTurnoResponseDto.
   */
  getById(id: number): Promise<MuelleTurnoResponseDto>;

  /**
   * Retrieves all MuelleTurno entities with pagination.
   * @param paginationDto - The pagination details for retrieving MuelleTurno entities.
   * @returns A promise that resolves to an array of MuelleTurnoResponseDto.
   */
  getAll(paginationDto: PaginationDto): Promise<MuelleTurnoResponseDto[]>;
}