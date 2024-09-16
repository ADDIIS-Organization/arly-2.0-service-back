import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@/infrastructure/dtos/user';
import { BaseCRUDController } from './common';
import { PaginationDto } from '@/infrastructure/dtos/common';
import { UserApplicationService } from '@/core/application/services/tenant';

@ApiTags('users') // Swagger Tag para el controlador de usuarios
@Controller('users')
export class UserController extends BaseCRUDController<
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(userApplicationService: UserApplicationService) {
    super(userApplicationService);
  }

  @Post()
  @ApiBody({ type: CreateUserDto }) // Añadir el decorador @ApiBody para POST
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createDto: CreateUserDto): Promise<UserResponseDto> {
    console.log("start debugging", createDto);
    return super.create(createDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto }) // Añadir el decorador @ApiBody para PUT
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async getAll(@Query() paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    return super.getAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getById(@Param('id') id: number): Promise<UserResponseDto> {
    return super.getById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
