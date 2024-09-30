import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepositoryAdapter } from '../common/base-repository.adapter';
import { RoleEntity } from '@/infrastructure/persistence/tenant/role.entity';
import { Role } from '@/core/domain/entities/role.entity';
import { IRoleRepositoryPort } from '@/core/domain/ports/outbound/role-repository.port';

@Injectable()
export class RoleRepositoryAdapter
  extends BaseRepositoryAdapter<RoleEntity, Role>
  implements IRoleRepositoryPort
{
  constructor(
    @InjectRepository(RoleEntity)
    repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }

  protected toEntity(role: Role): RoleEntity {
    const entity = new RoleEntity();
    entity.id = role.id;
    entity.name = role.name;
    entity.description = role.description;
    return entity;
  }

  protected toDomain(entity: RoleEntity): Role {
    return new Role(entity.id, entity.name, entity.description);
  }

  async findByName(name: string): Promise<Role | null> {
    const roleEntity = await this.repository.findOne({ where: { name } });
    return roleEntity ? this.toDomain(roleEntity) : null;
  }
}
