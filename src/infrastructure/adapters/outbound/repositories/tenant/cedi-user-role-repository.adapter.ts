import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CediUserRoleEntity,
  UserEntity,
  RoleEntity,
  CediEntity,
} from '@/infrastructure/persistence';
import { ICediUserRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { Cedi, CediUserRole, Role, User } from '@/core/domain/entities';

@Injectable()
export class CediUserRoleRepositoryAdapter
  implements ICediUserRoleRepositoryPort
{
  constructor(
    @InjectRepository(CediUserRoleEntity)
    private repository: Repository<CediUserRoleEntity>,
  ) {}

  async save(cediUserRole: CediUserRole): Promise<CediUserRole> {
    return this.createRelation(cediUserRole);
  }

  async update(id: number, cediUserRole: CediUserRole): Promise<CediUserRole> {
    const savedEntity = await this.repository.save(cediUserRole);
    return this.toDomain(savedEntity);
  }

  async createRelation(cediUserRole: CediUserRole): Promise<CediUserRole> {
    const savedEntity = await this.repository.save(cediUserRole);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<CediUserRole[]> {
    const relations = await this.repository.find({
      relations: ['user', 'role', 'cedi'],
    });
    return relations.map(this.toDomain);
  }

  async findById(id: number): Promise<CediUserRole> {
    const relation = await this.repository.findOne({
      where: { id },
      relations: ['user', 'role', 'cedi'],
    });
    if (!relation)
      throw new NotFoundException(`Relation with id ${id} not found`);
    return this.toDomain(relation);
  }

  async findByUserId(userId: number): Promise<CediUserRole[]> {
    const relations = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user', 'role', 'cedi'],
    });
    console.log(relations);
    return relations.map((entity) => this.toDomain(entity));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Mapeo de entidad de persistencia a entidad de dominio
  private toDomain(entity: CediUserRoleEntity): CediUserRole {
    if (!entity) return null;
    return new CediUserRole(
      entity.id,
      entity.user ? this.toUserDomain(entity.user) : null,
      entity.role ? this.toRoleDomain(entity.role) : null,
      entity.cedi ? this.toCediDomain(entity.cedi) : null,
    );
  }

  // Mapeo de persistencia a dominio
  private toUserDomain(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
    } as User;
  }

  private toRoleDomain(roleEntity: RoleEntity): Role {
    return new Role(roleEntity.id, roleEntity.name, roleEntity.description);
  }

  private toCediDomain(cediEntity: CediEntity): Cedi {
    return new Cedi(
      cediEntity.id,
      cediEntity.name,
      cediEntity.department,
      cediEntity.municipality,
      cediEntity.address,
      cediEntity.phone,
      cediEntity.primaryEmail,
      cediEntity.secondaryEmail,
      cediEntity.supervisor,
      cediEntity.company,
    );
  }
}
