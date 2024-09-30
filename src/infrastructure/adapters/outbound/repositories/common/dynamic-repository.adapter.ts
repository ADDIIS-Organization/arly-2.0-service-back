import { FindOptionsWhere, Repository } from 'typeorm';

import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';
import { TenantRepositoryAdapter } from '../tenant-repository.adapter';


interface BaseEntity {
  id?: number;
}

export abstract class DynamicRepositoryAdapter<
  Entity extends BaseEntity,
  Domain,
> {
  constructor(
    protected readonly tenantRepository: TenantRepositoryAdapter,
    protected readonly tenantContextService: TenantContextService,
  ) {}

  protected async getRepository(): Promise<Repository<Entity>> {
    const schema = this.tenantContextService.getTenantSchema();
    if (!schema) {
      throw new Error('Esquema del tenant no definido');
    }
    const dataSource = this.tenantRepository.getConnection(schema);
    return dataSource.getRepository<Entity>(this.getEntityClass());
  }

  protected abstract getEntityClass(): new () => Entity;

  async save(domain: Domain): Promise<Domain> {
    const repository = await this.getRepository();
    const entity = this.toEntity(domain);
    const savedEntity = await repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<Domain[]> {
    const repository = await this.getRepository();
    const entities = await repository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Domain | null> {
    const repository = await this.getRepository();
    const entity = await repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
    });
    if (!entity) {
      return null;
    }
    return this.toDomain(entity);
  }

  async update(id: number, domain: Domain): Promise<Domain> {
    const repository = await this.getRepository();
    const entity = this.toEntity(domain);
    await repository.update(id, entity as any);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const repository = await this.getRepository();
    await repository.delete(id);
  }

  protected abstract toEntity(domain: Domain): Entity;
  protected abstract toDomain(entity: Entity): Domain;
}
