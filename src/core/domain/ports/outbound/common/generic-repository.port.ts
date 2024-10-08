import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';
/**
 * Represents a generic repository port.
 * @template Entity - The type of entity managed by the repository.
 */
export interface IGenericRepositoryPort<Entity> {
  save(entity: Entity): Promise<Entity>;
  findAll(paginationDto: PaginationDto): Promise<Entity[]>;
  findById(id: number): Promise<Entity>;
  update(id: number, entity: Entity): Promise<Entity>;
  delete(id: number): Promise<void>;
}
