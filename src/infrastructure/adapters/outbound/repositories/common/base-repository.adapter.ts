import { Repository,  FindOptionsWhere } from 'typeorm';
import { PaginationDto } from '@/infrastructure/dtos/common';

export interface BaseEntity {
  id?: number;
}

export abstract class BaseRepositoryAdapter<Entity extends BaseEntity, Domain> {
   constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly relations: string[] = [], // Lista de relaciones opcional
  ) {}

  async save(domain: Domain): Promise<Domain> {
    const entity = this.toEntity(domain);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Domain[]> {
    const { offset, limit } = paginationDto;
    const entities = await this.repository.find({
      skip: offset,
      take: limit,
      relations : this.relations
    });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number ): Promise<Domain> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
      relations: this.relations
    });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async update(id: number, domain: Domain): Promise<Domain> {
    const entity = this.toEntity(domain);

    // Correctly cast entity to align with expected update type
    await this.repository.update(
      id,
      entity as any // Type assertion helps ensure type compatibility
    );

    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Abstract methods for conversions
  protected abstract toEntity(domain: Domain): Entity;
  protected abstract toDomain(entity: Entity): Domain;
}
