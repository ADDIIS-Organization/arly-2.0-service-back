import { DetalleTurno } from "@/core/domain/entities";
import { IArly1DetalleturnoRepositoryPort } from "@/core/domain/ports/outbound/arly-1-detalleturno-repository.port";
import { PaginationDto } from "@/infrastructure/dtos/common/pagination.dto";

import { DetalleTurnoEntity } from "@/infrastructure/persistence/tenant/arly1";

import { MuelleTurnoMapper } from "@/infrastructure/utils/mappers/muelleturno.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class Arly1DetalleturnoRepositoryAdapter implements IArly1DetalleturnoRepositoryPort {
  constructor(
    @InjectRepository(DetalleTurnoEntity) // Inyectamos el repositorio del DataSource secundario
    private readonly repository: Repository<DetalleTurnoEntity>,
    private readonly muelleTurnoMapper: MuelleTurnoMapper,
  ) {}  

  async findAll(paginationDto: PaginationDto): Promise<DetalleTurno[]> {
      const { offset, limit } = paginationDto;
      const entities = await this.repository.find({
        skip: offset,
        take: limit,
        relations: [
          'muelleTurno',
          'muelleTurno.sede',
          'muelleTurno.colaboradores',
        ],
      });
      
      console.log(entities);
      return entities.map((entity) =>   this.toDomain(entity));
  }

  async findById(muelleTurnoId: number): Promise<DetalleTurno[]> {
  const entities = await this.repository.find({
  where: {  idturno: muelleTurnoId  } as FindOptionsWhere<DetalleTurnoEntity>,
  relations: ['muelleTurno', 'muelleTurno.sede', 'muelleTurno.colaboradores'],
});

if (!entities || entities.length === 0) {
  return null;
}

return entities.map(entity => this.toDomain(entity));
}


  

  private toDomain(entity: DetalleTurnoEntity): DetalleTurno {
    return new DetalleTurno(
      entity.iddetalleturno,
      entity.idturno,
      entity.idactividad,
      entity.descripcion,
      entity.valorunidad,
      entity.cantidad,
      entity.cxv,
      entity.porcentajedescuento,
      entity.valordescuento,
      entity.valoriva,
      entity.subtotal,
      entity.estado,
      entity.muelleTurno
        ? this.muelleTurnoMapper.toDomain(entity.muelleTurno)
        : null,
    );
  }
}