import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { RoleEntity } from '@/infrastructure/persistence';
import { Role } from '@/core/domain/entities';

@Injectable()
export class RoleRepositoryAdapter implements IRoleRepositoryPort {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async save(role: Role): Promise<Role> {
    const savedRole = await this.repository.save(this.toEntity(role));
    return this.toDomain(savedRole);
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.repository.find();
    return roles.map((role) => this.toDomain(role));
  }

  async findById(id: number): Promise<Role> {
    const role = await this.repository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return this.toDomain(role);
  }

  async findByName(name: string): Promise<Role | null> {
    const roleEntity = await this.repository.findOne({ where: { name } });
    return roleEntity ? this.toDomain(roleEntity) : null; // Convert to domain model if found
  }

  async update(id: number, role: Role): Promise<Role> {
    await this.repository.update(id, this.toEntity(role));
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  private toEntity(role: Role): RoleEntity {
    const entity = new RoleEntity();
    entity.id = role.id;
    entity.name = role.name;
    entity.description = role.description;
    return entity;
  }

  private toDomain(entity: RoleEntity): Role {
    const { id, name, description } = entity;
    const role = new Role(id, name, description);
    return role;
  }
}
