import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@/infrastructure/dtos/role';
import { RoleApplicationService } from '@/core/application/services';
import { BaseCRUDController } from './common'; // Import IBaseApplicationPort
import { ApiDeleteOperation, ApiGetAllOperation, ApiPostOperation, ApiPutOperation, ApiSearchOperation } from '@/documentation/swagger/common/api-search.decorator';
import { PaginationDto } from '@/infrastructure/dtos/common';
import { SearchService } from '@/core/application/services/common/search.service';
import { RoleEntity } from '@/infrastructure/persistence';

@ApiTags('roles')
@Controller('roles')
export class RoleController extends BaseCRUDController<
  RoleResponseDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(roleApplicationService: RoleApplicationService,
    private readonly searchService: SearchService
  ) {
    super(roleApplicationService);
  }

  @Post()
  @ApiPostOperation( 'Role' , CreateRoleDto) 
  async create(@Body() createDto: CreateRoleDto): Promise<RoleResponseDto> {
    return super.create(createDto);
  }

  @Put(':id')
  @ApiPutOperation( 'Role' , UpdateRoleDto)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return super.update(id, updateDto);
  }

  @Get()
  @ApiGetAllOperation( 'Role' )
  async getAll(@Query() paginationDto: PaginationDto): Promise<RoleResponseDto[]> {
    return super.getAll(paginationDto);

  }

  

  @Get('search')
  @ApiSearchOperation( 'Role' )
  async searchRole(  @Query('field') field: string, // Campo en el que se realizará la búsqueda
      @Query('term') term: string){
        return this.searchService.search(RoleEntity,field, term);
      }

  @Delete(':id')
  @ApiDeleteOperation( 'Role' )
  async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
