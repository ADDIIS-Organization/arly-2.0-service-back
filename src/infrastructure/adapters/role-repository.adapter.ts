import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from '../../core/domain/ports/outbound/role-repository.port';
import { Role } from '../../core/domain/entities/role.entity';
import { RoleEntity } from '../persistence/role.entity';

@Injectable()
export class RoleRepositoryAdapter implements RoleRepository {
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
    return role ? this.toDomain(role) : null;
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
    const role = new Role();
    role.id = entity.id;
    role.name = entity.name;
    role.description = entity.description;
    return role;
  }
}
