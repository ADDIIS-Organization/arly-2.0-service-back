import { IGenericRepositoryPort } from '@/core/domain/ports/outbound/common/generic-repository.port';
import { PaginationDto } from './../../../../infrastructure/dtos/common/pagination.dto';

// DTO to Entity conversion methods will be implemented by subclasses
export abstract class CrudApplicationService<Entity, CreateDto, UpdateDto, ResponseDto> {
  constructor(private readonly repository: IGenericRepositoryPort<Entity>) {}

  async save(createDto: CreateDto): Promise<ResponseDto> {
    // Convert DTO to entity
    const entity = this.toEntity(createDto);
    const savedEntity = await this.repository.save(entity);
    return this.toResponseDto(savedEntity);
  }

  async getAll(PaginationDto: PaginationDto): Promise<ResponseDto[]> {
    const entities = await this.repository.findAll(PaginationDto);
    return entities.map((entity) => this.toResponseDto(entity));
  }

  async getById(id: number): Promise<ResponseDto> {
    const entity: Entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return this.toResponseDto(entity);
  }

  async update(id: number, updateDto: UpdateDto): Promise<ResponseDto> {
    // Convert DTO to updated entity
    const entity = await this.toUpdatedEntity(id, updateDto);
    const updatedEntity: Entity = await this.repository.update(id, entity);
    return this.toResponseDto(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Abstract methods for conversion
  protected abstract toEntity(createDto: CreateDto): Entity;
  protected abstract toUpdatedEntity(id: number, updateDto: UpdateDto): Promise<Entity>;
  protected abstract toResponseDto(entity: Entity): ResponseDto;
}