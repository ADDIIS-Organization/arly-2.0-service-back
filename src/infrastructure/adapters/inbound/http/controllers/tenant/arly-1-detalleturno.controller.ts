import { ApiGetByIdOperation } from "@/documentation/swagger/common/api-search.decorator";
import { Arly1DetalleturnoApplicationService } from "@/core/application/services/tenant";
import { DetalleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";
import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param, Query } from "@nestjs/common";

@ApiTags('arly-1-detalleturno')
@Controller('arly-1-detalleturno')
export class Arly1DetalleturnoController {
  constructor(
    private readonly arly1DetalleturnoApplicationService: Arly1DetalleturnoApplicationService,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all Cedis' })
  @ApiResponse({ status: 200, description: 'Return all Cedis.' })
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<DetalleTurnoResponseDto[]> {
    return this.arly1DetalleturnoApplicationService.getAll(paginationDto);
  }

  @Get(':id')
  @ApiGetByIdOperation('DetalleTurno')
  async getById(@Param('id') id: number): Promise<DetalleTurnoResponseDto[]> {
    return this.arly1DetalleturnoApplicationService.getById(id);
  }
}
