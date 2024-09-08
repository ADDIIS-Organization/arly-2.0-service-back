import { Injectable } from '@nestjs/common';

import { IUserApplicationPort } from '../ports/inbound/user-application.port';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@/infrastructure/dtos/user';
import { IUserRepositoryPort } from '@/core/domain/ports/outbound';
import { CrudApplicationService } from './common';
import { User } from '@/core/domain/entities';

@Injectable()
export class UserApplicationService
  extends CrudApplicationService<
    User,
    CreateUserDto,
    UpdateUserDto,
    UserResponseDto
  >
  implements IUserApplicationPort
{
  protected toEntity(createDto: CreateUserDto): User {
    throw new Error('Method not implemented.');
  }
  protected toUpdatedEntity(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
  constructor(
    userDomainService: UserDomainService,
    userRepository: IUserRepositoryPort) {
    super(userRepository);
  }

  // Implementación del método abstracto para convertir User en UserResponseDto
  protected toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      roles: user.roles,
      cedis: user.cedis,
    };
  }
}
