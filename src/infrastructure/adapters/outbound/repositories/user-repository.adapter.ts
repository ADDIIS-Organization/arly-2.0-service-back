import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepositoryPort } from '@/core/domain/ports/outbound';
import { CentralUserEntity, UserEntity } from '@/infrastructure/persistence';
import { User } from '@/core/domain/entities';
import { BaseRepositoryAdapter } from './common';

@Injectable()
export class UserRepositoryAdapter
  extends BaseRepositoryAdapter<CentralUserEntity, User>
  implements IUserRepositoryPort
{
  constructor(
    @InjectRepository(CentralUserEntity)
    repository: Repository<CentralUserEntity>,
  ) {
    super(repository); // Llamamos al constructor de la clase base
  }

  async findByUserName(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { username } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  protected toEntity(user: User): CentralUserEntity {
    const entity = new CentralUserEntity();
    entity.id = user.id ?? undefined; // Undefined permite que TypeORM genere el ID automáticamente
    entity.name = user.name;
    entity.email = user.email;
    entity.username = user.username;
    entity.password = user.password;
    // Relaciones como CediRoleUserEntities se gestionan automáticamente
    return entity;
  }

  // Convertir de entidad de persistencia a entidad de dominio
  protected toDomain(entity: CentralUserEntity): User {
    const { id, name, email, username, password } = entity;
    const user = new User(id, name, email, username, password);
    return user;
  }
}
