import { Query } from '@nestjs/common';

import { IBaseCRUDApplicationPort } from '@/core/application/ports/inbound/common/base-crud-application.port';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';

/**
 * Base CRUD Controller class for handling common CRUD operations.
 * @template T - The entity type.
 * @template CreateDto - The DTO type for creating the entity.
 * @template UpdateDto - The DTO type for updating the entity.
 */
export class BaseCRUDController<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly applicationService: IBaseCRUDApplicationPort<
      T,
      CreateDto,
      UpdateDto
    >,
  ) {}

  /**
   * Creates a new entity.
   * @param createDto - The DTO containing the data for the entity to create.
   * @returns A promise that resolves to the created entity of type T.
   */
  async create(createDto: CreateDto): Promise<T> {
    return this.applicationService.save(createDto);
  }

  /**
   * Retrieves all entities with pagination.
   * @param paginationDto - The pagination details for retrieving entities.
   * @returns A promise that resolves to an array of entities of type T.
   */
  async getAll(@Query() paginationDto: PaginationDto): Promise<T[]> {
    return this.applicationService.getAll(paginationDto);
  }

  /**
   * Retrieves an entity by its ID.
   * @param id - The ID of the entity to retrieve.
   * @returns A promise that resolves to the entity of type T.
   */
  async getById(id: number): Promise<T> {
    return this.applicationService.getById(id);
  }

  /**
   * Updates an entity by its ID.
   * @param id - The ID of the entity to update.
   * @param updateDto - The DTO containing the updated data.
   * @returns A promise that resolves to the updated entity of type T.
   */
  async update(id: number, updateDto: UpdateDto): Promise<T> {
    return this.applicationService.update(id, updateDto);
  }

  /**
   * Deletes an entity by its ID.
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves when the entity is deleted.
   */
  async delete(id: number): Promise<void> {
    await this.applicationService.delete(id);
  }
}