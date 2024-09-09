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

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Mapeo de entidad de persistencia a entidad de dominio
  private toDomain(entity: CediUserRoleEntity): CediUserRole {
    return new CediUserRole(
      entity.id,
      this.toUserDomain(entity.user), // Mapea de persistencia a dominio
      this.toRoleDomain(entity.role), // Mapea de persistencia a dominio
      this.toCediDomain(entity.cedi), // Mapea de persistencia a dominio
    );
  }

  // Mapeo de dominio a persistencia
  private toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.username = user.username;
    userEntity.password = user.password;
    return userEntity;
  }

  private toRoleEntity(role: Role): RoleEntity {
    const roleEntity = new RoleEntity();
    roleEntity.id = role.id;
    roleEntity.name = role.name;
    roleEntity.description = role.description;
    return roleEntity;
  }

  private toCediEntity(cedi: Cedi): CediEntity {
    const cediEntity = new CediEntity();
    cediEntity.id = cedi.id;
    cediEntity.name = cedi.name;
    cediEntity.department = cedi.department;
    cediEntity.municipality = cedi.municipality;
    cediEntity.address = cedi.address;
    cediEntity.phone = cedi.phone;
    cediEntity.primaryEmail = cedi.primaryEmail;
    cediEntity.secondaryEmail = cedi.secondaryEmail;
    cediEntity.supervisor = cedi.supervisor;
    cediEntity.company = cedi.company;
    return cediEntity;
  }

  // Mapeo de persistencia a dominio
  private toUserDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.username,
      userEntity.password,
    );
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
