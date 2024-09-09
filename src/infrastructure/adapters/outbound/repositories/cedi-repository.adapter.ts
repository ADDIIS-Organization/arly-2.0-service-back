import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICediRepositoryPort } from '@/core/domain/ports/outbound/cedi-repository.port';
import { Cedi } from '@/core/domain/entities/cedi.entity'; // Entidad de dominio
import { CediEntity } from '@/infrastructure/persistence';

@Injectable()
export class CediRepositoryAdapter implements ICediRepositoryPort {
  constructor(
    @InjectRepository(CediEntity)
    private repository: Repository<CediEntity>, // Repositorio de TypeORM para CediEntity
  ) {}

  // Guardar un Cedi
  async save(cedi: Cedi): Promise<Cedi> {
    const savedCediEntity = await this.repository.save(this.toEntity(cedi));
    return this.toDomain(savedCediEntity);
  }

  // Obtener todos los Cedis
  async findAll(): Promise<Cedi[]> {
    const cediEntities = await this.repository.find();
    return cediEntities.map((cediEntity) => this.toDomain(cediEntity));
  }

  // Buscar un Cedi por ID
  async findById(id: number): Promise<Cedi> {
    const cediEntity = await this.repository.findOne({ where: { id } });
    if (!cediEntity) {
      throw new NotFoundException(`Cedi with id ${id} not found`);
    }
    return this.toDomain(cediEntity);
  }

  // Actualizar un Cedi
  async update(id: number, cedi: Cedi): Promise<Cedi> {
    await this.repository.update(id, this.toEntity(cedi));
    return this.findById(id);
  }

  // Eliminar un Cedi por ID
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Convertir la entidad de dominio a la entidad de persistencia (CediEntity)
  private toEntity(cedi: Cedi): CediEntity {
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

  // Convertir la entidad de persistencia a la entidad de dominio (Cedi)
  private toDomain(entity: CediEntity): Cedi {
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
