import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CediRoleUserEntity,
  UserEntity,
  RoleEntity,
  CediEntity,
  CentralUserEntity,
} from '@/infrastructure/persistence';
import { ICediRoleUserRepositoryPort } from '@/core/domain/ports/outbound';
import { Cedi, CediRoleUser, Role, User } from '@/core/domain/entities';
import { BaseRepositoryAdapter } from '../common';


@Injectable()
export class CediRoleUserRepositoryAdapter
  extends BaseRepositoryAdapter<CediRoleUserEntity, CediRoleUser>
  implements ICediRoleUserRepositoryPort
{
  constructor(
    @InjectRepository(CediRoleUserEntity)
    protected readonly repository: Repository<CediRoleUserEntity>,
  ) {
    super(repository , ['user', 'role', 'cedi']); // Llamamos al constructor de la clase base
  }

  // Método adicional específico
  async findByUserId(userId: number): Promise<CediRoleUser[]> {
    const relations = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user', 'role', 'cedi'],
    });
    return relations.map((entity) => this.toDomain(entity));
  }
  async createRelation(CediRoleUser: CediRoleUser): Promise<CediRoleUser> {
    const savedEntity = await this.repository.save(CediRoleUser);
    return this.toDomain(savedEntity);
  }

  protected toEntity(domain: CediRoleUser): CediRoleUserEntity {
    const entity = new CediRoleUserEntity();
    entity.id = domain.id;
    entity.user = domain.user ? this.toUserEntity(domain.user) : null;
    entity.role = domain.role ? this.toRoleEntity(domain.role) : null;
    entity.cedi = domain.cedi ? this.toCediEntity(domain.cedi) : null;
    return entity;
  }

  protected toDomain(entity: CediRoleUserEntity): CediRoleUser {
    if (!entity) return null;
    return new CediRoleUser(
      entity.id,
      entity.user ? this.toUserDomain(entity.user) : null,
      entity.role ? this.toRoleDomain(entity.role) : null,
      entity.cedi ? this.toCediDomain(entity.cedi) : null,
    );
  }

  // Métodos auxiliares para mapear User, Role y Cedi
  private toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    // userEntity.name = user.name;
    // userEntity.email = user.email;
    // userEntity.username = user.username;
    // userEntity.password = user.password;
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
