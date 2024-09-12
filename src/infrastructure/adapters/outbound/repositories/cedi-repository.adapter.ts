import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICediRepositoryPort } from '@/core/domain/ports/outbound/cedi-repository.port';
import { Cedi } from '@/core/domain/entities/cedi.entity'; 
import { CediEntity } from '@/infrastructure/persistence';
import { BaseRepositoryAdapter } from './common';


@Injectable()
export class CediRepositoryAdapter
  extends BaseRepositoryAdapter<CediEntity, Cedi>
  implements ICediRepositoryPort
{
  constructor(
    @InjectRepository(CediEntity)
    repository: Repository<CediEntity>, 
  ) {
    super(repository); // Llamamos al constructor de la clase base
  }

  protected toEntity(cedi: Cedi): CediEntity {
    const entity = new CediEntity();
    entity.id = cedi.id;
    entity.name = cedi.name;
    entity.department = cedi.department;
    entity.municipality = cedi.municipality;
    entity.address = cedi.address;
    entity.phone = cedi.phone;
    entity.primaryEmail = cedi.primaryEmail;
    entity.secondaryEmail = cedi.secondaryEmail;
    entity.supervisor = cedi.supervisor;
    entity.company = cedi.company;
    return entity;
  }

  protected toDomain(entity: CediEntity): Cedi {
    return new Cedi(
      entity.id,
      entity.name,
      entity.department,
      entity.municipality,
      entity.address,
      entity.phone,
      entity.primaryEmail,
      entity.secondaryEmail,
      entity.supervisor,
      entity.company,
    );
  }
}
