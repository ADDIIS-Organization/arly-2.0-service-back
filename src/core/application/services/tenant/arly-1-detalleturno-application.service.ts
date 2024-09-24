import { Arly1MuelleturnoApplicationService } from '@/core/application/services/tenant';
import { PaginationDto } from '../../../../infrastructure/dtos/common/pagination.dto';
import { DetalleTurno } from "@/core/domain/entities";

import { DetalleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";
import { Inject, Injectable } from "@nestjs/common";
import { IArly1DetalleturnoPort, IArlyApplicationPort } from '../../ports/inbound';
import { MuelleTurnoMapper } from '@/infrastructure/utils/mappers/muelleturno.mapper';
import { IArly1DetalleturnoRepositoryPort } from '@/core/domain/ports/outbound/arly-1-detalleturno-repository.port';

@Injectable()
export class Arly1DetalleturnoApplicationService
  implements IArly1DetalleturnoPort
{
  constructor(
    @Inject('IArly1DetalleturnoRepositoryPort')
    private readonly arly1DetalleturnoRepository: IArly1DetalleturnoRepositoryPort,
    private readonly muelleTurnoMapper: MuelleTurnoMapper,
  ) {}

  async getAll(
    PaginationDto: PaginationDto,
  ): Promise<DetalleTurnoResponseDto[]> {
    const entities =
      await this.arly1DetalleturnoRepository.findAll(PaginationDto);
    return entities.map((entity) => this.toResponseDto(entity));
  }

  async getById(iddetalleturno: number): Promise<DetalleTurnoResponseDto[]> {
    const detallesTurno: DetalleTurno[] =
      await this.arly1DetalleturnoRepository.findById(iddetalleturno);
    if (!detallesTurno.length) {
      throw new Error('Detalle Turno not found');
    }
    return detallesTurno.map((detalleTurno) => this.toResponseDto(detalleTurno));
  }

  private toResponseDto(detalleTurno: DetalleTurno): DetalleTurnoResponseDto {
    console.log(JSON.stringify(detalleTurno));
    return {
      iddetalleturno: detalleTurno.iddetalleturno,
      idturno: detalleTurno.idturno,
      idactividad: detalleTurno.idactividad,
      descripcion: detalleTurno.descripcion,
      valorunidad: detalleTurno.valorunidad,
      cantidad: detalleTurno.cantidad,
      cxv: detalleTurno.cxv,
      porcentajedescuento: detalleTurno.porcentajedescuento,
      valordescuento: detalleTurno.valordescuento,
      valoriva: detalleTurno.valoriva,
      subtotal: detalleTurno.subtotal,
      estado: detalleTurno.estado,
      turno: this.muelleTurnoMapper.toResponseDto(detalleTurno.turno),
    };
  }
}