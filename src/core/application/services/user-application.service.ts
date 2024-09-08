import { Injectable } from '@nestjs/common';

import { IUserApplicationPort } from '../ports/inbound/user-application.port';
import { CreateUserDto, UserResponseDto } from '@/infrastructure/dtos/user';
import { CrudApplicationService } from './common';
import { User } from '@/core/domain/entities';

@Injectable()
export class UserApplicationService
  extends CrudApplicationService<CreateUserDto, UserResponseDto>
  implements IUserApplicationPort
{
  constructor(
    private readonly userDomainService: userDomainService,
    private readonly userRepository: IUserRepositoryPort,
  ) {
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
      cedis: user.cedis
    };
  }
}
