import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@/infrastructure/dtos/role';
import { RoleApplicationService } from '@/core/application/services';
import { BaseCRUDController } from './common'; // Import IBaseApplicationPort

@ApiTags('roles')
@Controller('roles')
export class RoleController extends BaseCRUDController<
  RoleResponseDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(roleApplicationService: RoleApplicationService) {
    super(roleApplicationService);
  }

  @Post()
  @ApiBody({ type: CreateRoleDto }) // Añadir el decorador @ApiBody para POST
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'The role has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createDto: CreateRoleDto): Promise<RoleResponseDto> {
    return super.create(createDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateRoleDto }) // Añadir el decorador @ApiBody para PUT
  @ApiOperation({ summary: 'Update a Role' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  async getAll(): Promise<RoleResponseDto[]> {
    return super.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the role.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async getById(@Param('id') id: number): Promise<RoleResponseDto> {
    return super.getById(id);
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
    return super.delete(id);
  }
}
