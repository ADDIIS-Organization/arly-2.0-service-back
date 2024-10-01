import { MuelleTurno } from "@/core/domain/entities";
import { IArly1MuelleturnoRepositoryPort } from "@/core/domain/ports/outbound";

import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";
import { MuelleTurnoEntity } from "@/infrastructure/persistence/tenant/arly1";

import { MuelleTurnoMapper } from "@/infrastructure/utils/mappers/muelleturno.mapper";
;
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class Arly1MuelleturnoRepositoryAdapter
  implements IArly1MuelleturnoRepositoryPort
{
  constructor(
    @InjectRepository(MuelleTurnoEntity, 'ARLY1_DATA_SOURCE') // Inyectamos el repositorio del DataSource secundario
    private readonly repository: Repository<MuelleTurnoEntity>,
    private readonly muelleTurnoMapper : MuelleTurnoMapper,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<MuelleTurno[]> {
    const { offset, limit } = paginationDto;
    const entities = await this.repository.find({
      skip: offset,
      take: limit,
      relations: ['sede', 'colaboradores', 'detalles'],
    });
    return entities.map((entity) => this.muelleTurnoMapper.toDomain(entity));
  }
  async findById(idturno: number): Promise<MuelleTurno> {
  
    const entity = await this.repository.findOne({
      where: { idturno } as FindOptionsWhere<MuelleTurnoEntity>,
      relations: ['sede', 'colaboradores', 'detalles'],
    });
   
    if (!entity) {
      return null;
    }
    return this.muelleTurnoMapper.toDomain(entity);
  }
  
}
