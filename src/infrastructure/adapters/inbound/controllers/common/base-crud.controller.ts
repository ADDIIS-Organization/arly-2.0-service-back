import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { IBaseApplicationPort } from '@/core/application/ports/inbound/common';

/**
 * Base CRUD Controller class for handling common CRUD operations.
 * @template T - The entity type.
 * @template CreateDto - The DTO type for creating entities.
 * @template UpdateDto - The DTO type for updating entities.
 */
export class BaseCRUDController<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly applicationService: IBaseApplicationPort<
      T,
      CreateDto,
      UpdateDto
    >,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new entity' })
  @ApiResponse({
    status: 201,
    description: 'The entity has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createDto: CreateDto): Promise<T> {
    return this.applicationService.save(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entities' })
  @ApiResponse({ status: 200, description: 'Return all entities.' })
  async findAll(): Promise<T[]> {
    return this.applicationService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an entity by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the entity.' })
  @ApiResponse({ status: 404, description: 'Entity not found.' })
  async findById(@Param('id') id: number): Promise<T> {
    return this.applicationService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an entity' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The entity has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Entity not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateDto,
  ): Promise<T> {
    return this.applicationService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an entity' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The entity has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Entity not found.' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.applicationService.delete(id);
  }
}
