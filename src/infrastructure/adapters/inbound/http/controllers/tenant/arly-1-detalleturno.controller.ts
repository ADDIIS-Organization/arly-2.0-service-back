
import { Arly1DetalleturnoApplicationService } from "@/core/application/services/tenant";
import { ApiGetAllOperation, ApiGetByIdOperation } from "@/documentation/swagger/common/api-search.decorator";
import { PaginationDto } from "@/infrastructure/dtos/common";
import { DetalleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('arly-1-detalleturno')
@Controller('arly-1-detalleturno')
export class Arly1DetalleturnoController {
 constructor(
  private readonly arly1DetalleturnoApplicationService: Arly1DetalleturnoApplicationService,
 ) {}
@Get()
@ApiGetAllOperation('DetalleTurno')
async getAll(
    @Query() paginationDto: PaginationDto,):Promise<DetalleTurnoResponseDto[]> {
    return this.arly1DetalleturnoApplicationService.getAll(paginationDto);
  }

  @Get(':id')
  @ApiGetByIdOperation('DetalleTurno')
  async getById(@Param('id') id: number): Promise<DetalleTurnoResponseDto[]> {
    return this.arly1DetalleturnoApplicationService.getById(id);
  }
} 