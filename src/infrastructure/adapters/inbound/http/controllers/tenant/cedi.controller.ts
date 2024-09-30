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

import { CediApplicationService } from '@/core/application/services/tenant/cedi-application.service';
import { CediResponseDto } from '@/infrastructure/dtos/tenant/cedi/cedi-response.dto';
import { CreateCediDto } from '@/infrastructure/dtos/tenant/cedi/create-cedi.dto';
import { UpdateCediDto } from '@/infrastructure/dtos/tenant/cedi/update-cedi.dto';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';
import { BaseCRUDController } from '../common/base-crud.controller';

@ApiTags('cedis') // Swagger Tag para el controlador de cedis
@Controller('cedis')
export class CediController extends BaseCRUDController<
  CediResponseDto,
  CreateCediDto,
  UpdateCediDto
> {
  constructor(cediApplicationService: CediApplicationService) {
    super(cediApplicationService);
  }

  @Post()
  @ApiBody({ type: CreateCediDto }) // Añadir el decorador @ApiBody para POST
  @ApiOperation({ summary: 'Create a new Cedi' })
  @ApiResponse({
    status: 201,
    description: 'The Cedi has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createDto: CreateCediDto): Promise<CediResponseDto> {
    return super.create(createDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCediDto }) // Añadir el decorador @ApiBody para PUT
  @ApiOperation({ summary: 'Update a Cedi' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The Cedi has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Cedi not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateCediDto,
  ): Promise<CediResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Cedis' })
  @ApiResponse({ status: 200, description: 'Return all Cedis.' })
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<CediResponseDto[]> {
    return super.getAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Cedi by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the Cedi.' })
  @ApiResponse({ status: 404, description: 'Cedi not found.' })
  async getById(@Param('id') id: number): Promise<CediResponseDto> {
    return super.getById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a Cedi' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The Cedi has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Cedi not found.' })
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
