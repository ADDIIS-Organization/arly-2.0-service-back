import { IGenericRepositoryPort } from '@/core/domain/ports/outbound/common';

export abstract class CrudApplicationService<Entity, ResponseDto> {
  constructor(private readonly repository: IGenericRepositoryPort<Entity>) {}

  async save(entity: Entity): Promise<ResponseDto> {
    const savedEntity = await this.repository.save(entity);
    return this.toResponseDto(savedEntity);
  }

  async getAll(): Promise<ResponseDto[]> {
    const entities = await this.repository.findAll();
    return entities.map((entity) => this.toResponseDto(entity));
  }

  async getById(id: number): Promise<ResponseDto> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return this.toResponseDto(entity);
  }

  async update(id: number, entity: Entity): Promise<ResponseDto> {
    const updatedEntity = await this.repository.update(id, entity);
    return this.toResponseDto(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  protected abstract toResponseDto(entity: Entity): ResponseDto;
}
