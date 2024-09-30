import {  MuelleTurno } from '../../entities';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';

export interface IArly1MuelleturnoRepositoryPort {
  findById(id: number): Promise<MuelleTurno>;
  findAll(PaginationDto: PaginationDto): Promise<MuelleTurno[]>;
}