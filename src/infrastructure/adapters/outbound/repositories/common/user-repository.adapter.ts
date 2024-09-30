import { Injectable } from '@nestjs/common';

import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';
import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { IUserRepositoryPort } from '@/core/domain/ports/outbound/user-repository.port';
import { DynamicRepositoryAdapter } from './dynamic-repository.adapter';
import { TenantRepositoryAdapter } from '../tenant-repository.adapter';
import { User } from '@/core/domain/entities/user.entity';


@Injectable()
export class UserRepositoryAdapter
  extends DynamicRepositoryAdapter<CentralUserEntity, User>
  implements IUserRepositoryPort
{
  constructor(
    tenantRepository: TenantRepositoryAdapter,
    tenantContextService: TenantContextService,
  ) {
    super(tenantRepository, tenantContextService);
  }

  protected getEntityClass(): new () => CentralUserEntity {
    return CentralUserEntity;
  }

  protected toEntity(user: User): CentralUserEntity {
    const entity = new CentralUserEntity();
    entity.id = user.id ?? undefined;
    entity.name = user.name;
    entity.email = user.email;
    entity.username = user.username;
    entity.password = user.password;
    return entity;
  }

  protected toDomain(entity: CentralUserEntity): User {
    const { id, name, email, username, password } = entity;
    return new User(id, name, email, username, password);
  }

  async findByUserName(username: string): Promise<User | null> {
    const repository = await this.getRepository();
    const userEntity = await repository.findOne({ where: { username } });
    return userEntity ? this.toDomain(userEntity) : null;
  }
}
