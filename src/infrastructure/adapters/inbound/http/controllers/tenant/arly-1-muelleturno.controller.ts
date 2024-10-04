import { Arly1MuelleturnoApplicationService } from "@/core/application/services/tenant";
import { ApiGetAllOperation, ApiGetByIdOperation } from "@/documentation/swagger/common/api-search.decorator";
import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";

import { MuelleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('arly-1-muelleturno')
@Controller('arly-1-muelleturno')
export class Arly1MuelleturnoController {

  constructor(
    private readonly arly1MuelleturnoApplicationService: Arly1MuelleturnoApplicationService, 
  ){}
 
  @Get()
  @ApiGetAllOperation('MuelleTurno')
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<MuelleTurnoResponseDto[]> {
    return this.arly1MuelleturnoApplicationService.getAll(paginationDto);
  }

  @Get(':id')
  @ApiGetByIdOperation('MuelleTurno')
  async getById(@Param('id') id: number): Promise<MuelleTurnoResponseDto> {
    
    return this.arly1MuelleturnoApplicationService.getById(id);
  }
}