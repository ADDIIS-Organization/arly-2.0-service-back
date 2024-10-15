import { IArlyApplicationPort } from "../../ports/inbound";
import { Inject, Injectable } from "@nestjs/common";

import { MuelleTurnoMapper } from "@/infrastructure/utils/mappers/muelleturno.mapper";
import { IArly1MuelleturnoRepositoryPort } from "@/core/domain/ports/outbound";
import { MuelleTurnoResponseDto } from "@/infrastructure/dtos/tenant/arly-1";
import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { MuelleTurno } from "@/core/domain/entities";


@Injectable()
export class Arly1MuelleturnoApplicationService
  implements IArlyApplicationPort
{
  constructor(
    @Inject('IArly1MuelleturnoRepositoryPort')
    private readonly arly1MuelleturnoRepository: IArly1MuelleturnoRepositoryPort, 
    private readonly MuelleTurnoMapper: MuelleTurnoMapper,
  ) {}
  async getAll(
    PaginationDto: PaginationDto,
  ): Promise<MuelleTurnoResponseDto[]> {
    const entities =
      await this.arly1MuelleturnoRepository.findAll(PaginationDto);
      
    return entities.map((entity) => this.MuelleTurnoMapper.toResponseDto(entity));
  }

  async getById(idturno: number): Promise<MuelleTurnoResponseDto> {
    
    const muelleTurno : MuelleTurno = await this.arly1MuelleturnoRepository.findById(idturno);
   
    if (!muelleTurno) {
      throw new Error('Entity not found');
    }
    return this.MuelleTurnoMapper.toResponseDto(muelleTurno);
  }
  // Método para retornar un MuelleTurno como Response DTO

  
}