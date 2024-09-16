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
    ApiQuery,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { CreateCediDto, CediResponseDto, UpdateCediDto } from '@/infrastructure/dtos/cedi';
  import { CediApplicationService } from '@/core/application/services';
  import { BaseCRUDController } from './common';
import { PaginationDto } from '@/infrastructure/dtos/common/pagination.dto';
import { SearchService } from '@/core/application/services/common/search.service';
import { CediEntity } from '@/infrastructure/persistence';
import { ApiDeleteOperation, ApiGetAllOperation, ApiPostOperation, ApiPutOperation, ApiSearchOperation } from '@/documentation/swagger/common/api-search.decorator';
  
  @ApiTags('cedis') // Swagger Tag para el controlador de cedis
  @Controller('cedis')
  export class CediController extends BaseCRUDController<
    CediResponseDto,
    CreateCediDto,
    UpdateCediDto
  > {
    constructor(
      cediApplicationService: CediApplicationService,
      private readonly searchService: SearchService,
    ) {
      super(cediApplicationService);
    }

    @Post()
   @ApiPostOperation( 'Cedi' , CreateCediDto)
    async create(@Body() createDto: CreateCediDto): Promise<CediResponseDto> {
      return super.create(createDto);
    }

    @Put(':id')
    @ApiPutOperation( 'Cedi', UpdateCediDto)
    async update(
      @Param('id') id: number,
      @Body() updateDto: UpdateCediDto,
    ): Promise<CediResponseDto> {
      return super.update(id, updateDto);
    }

    @Get()
    @ApiGetAllOperation( 'Cedi')
    async getAll(
      @Query() paginationDto: PaginationDto,
    ): Promise<CediResponseDto[]> {
      return super.getAll(paginationDto);
    }

    
    @Get('search')
    @ApiSearchOperation( 'Cedi') // Usamos el decorador personalizado
    async searchCedis(
      @Query('field') field: string, // Campo en el que se realizará la búsqueda
      @Query('term') term: string, // Término de búsqueda
    ) {
      // Usar el servicio de búsqueda para buscar en la entidad "CediEntity"
      return this.searchService.search(CediEntity, field, term);
    }
    @Delete(':id')
    @ApiDeleteOperation( 'Cedi')
    async delete(@Param('id') id: number): Promise<void> {
      return super.delete(id);
    }
  }
  