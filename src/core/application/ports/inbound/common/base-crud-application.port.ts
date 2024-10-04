import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';

export interface IBaseCRUDApplicationPort<T, CreateDto, UpdateDto> {
  /**
   * Updates an entity by its ID.
   * @param id - The ID of the entity to update.
   * @param updateDto - The DTO containing the updated data.
   * @returns A promise that resolves to the updated entity of type T.
   */
  update(id: number, updateDto: UpdateDto): Promise<T>;

  /**
   * Saves a new entity to the database.
   * @param createDto - The DTO containing the data to create the new entity.
   * @returns A promise that resolves to the created entity of type T.
   */
  save(createDto: CreateDto): Promise<T>;

  /**
   * Deletes an entity by its ID.
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves when the entity is deleted.
   */
  delete(id: number): Promise<void>;

  /**
   * Retrieves an entity by its ID.
   * @param id - The ID of the entity to retrieve.
   * @returns A promise that resolves to the entity of type T.
   */
  getById(id: number): Promise<T>;

  /**
   * Retrieves all entities with pagination.
   * @param paginationDto - The pagination details for retrieving entities.
   * @returns A promise that resolves to an array of entities of type T.
   */
  getAll(paginationDto: PaginationDto): Promise<T[]>;
}
