import { Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { IBaseApplicationPort } from '@/core/application/ports/inbound/common';

/**
 * Base CRUD Controller class for handling common CRUD operations.
 * @template T - The entity type.
 * @template CreateDto - The DTO type for creating the entity.
 * @template UpdateDto - The DTO type for updating the entity.
 */
export class BaseCRUDController<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly applicationService: IBaseApplicationPort<
      T,
      CreateDto,
      UpdateDto
    >,
  ) {}

  async create(createDto: CreateDto): Promise<T> {
    return this.applicationService.save(createDto);
  }

  async getAll(): Promise<T[]> {
    return this.applicationService.getAll();
  }

  async getById(id: number): Promise<T> {
    return this.applicationService.getById(id);
  }

  async update(id: number, updateDto: UpdateDto): Promise<T> {
    return this.applicationService.update(id, updateDto);
  }

  async delete(id: number): Promise<void> {
    await this.applicationService.delete(id);
  }
}
