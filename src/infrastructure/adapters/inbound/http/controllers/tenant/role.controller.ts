import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiDeleteOperation,
  ApiPostOperation,
  ApiPutOperation,
  ApiSearchOperation,
} from '@/documentation/swagger/common/api-search.decorator';
import { RoleApplicationService } from '@/core/application/services/tenant/role-application.service';
import { RoleResponseDto } from '@/infrastructure/dtos/tenant/role/role-response.dto';
import { CreateRoleDto } from '@/infrastructure/dtos/tenant/role/create-role.dto';
import { UpdateRoleDto } from '@/infrastructure/dtos/tenant/role/update-role.dto';
import { SearchService } from '@/core/application/services/common/search.service';
import { RoleEntity } from '@/infrastructure/persistence/tenant/role.entity';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';
import { BaseCRUDController } from '../common/base-crud.controller';

@ApiTags('roles')
@Controller('roles')
export class RoleController extends BaseCRUDController<
  RoleResponseDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(
    roleApplicationService: RoleApplicationService,
    private readonly searchService: SearchService,
  ) {
    super(roleApplicationService);
  }

  @Post()
  @ApiPostOperation('Role', CreateRoleDto)
  async create(@Body() createDto: CreateRoleDto): Promise<RoleResponseDto> {
    return super.create(createDto);
  }

  @Put(':id')
  @ApiPutOperation('Role', UpdateRoleDto)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<RoleResponseDto[]> {
    return super.getAll(paginationDto);
  }

  @Get('search')
  @ApiSearchOperation('Role')
  async searchRole(
    @Query('field') field: string, // Campo en el que se realizará la búsqueda
    @Query('term') term: string,
  ) {
    return this.searchService.search(RoleEntity, field, term);
  }

  @Delete(':id')
  @ApiDeleteOperation('Role')
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
