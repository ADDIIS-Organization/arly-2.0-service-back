import { Inject, Injectable } from '@nestjs/common';

import {
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto,
} from '@/infrastructure/dtos/user';
import {
  RoleRepositoryAdapter,
  CediRepositoryAdapter,
} from '@/infrastructure/adapters/outbound/repositories';
import {
  UserDomainService,
  CediUserRoleDomainService,
} from '@/core/domain/services';
import { CediUserRoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import {
  ICediRepositoryPort,
  ICediUserRoleRepositoryPort,
  IRoleRepositoryPort,
  IUserRepositoryPort,
} from '@/core/domain/ports/outbound';
import { IUserApplicationPort } from '../ports/inbound';
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
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly cediUserRoleDomainService: CediUserRoleDomainService, // Nuevo servicio para manejar la creación de relaciones
    @Inject('IUserRepositoryPort')
    private readonly userRepository: IUserRepositoryPort,
    @Inject('IRoleRepositoryPort')
    private readonly roleRepository: IRoleRepositoryPort,
    @Inject('ICediRepositoryPort')
    private readonly cediRepository: ICediRepositoryPort,
    @Inject('ICediUserRoleRepositoryPort')
    private readonly cediUserRoleRepository: ICediUserRoleRepositoryPort,
  ) {
    super(userRepository);
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUserName(username);
  }

  protected toEntity(createDto: CreateUserDto): User {
    return this.userDomainService.createUser(
      createDto.name,
      createDto.email,
      createDto.username,
      createDto.password,
    );
  }

  protected async toUpdatedEntity(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.updateInfo(updateDto.name, updateDto.email, updateDto.username);
    return user;
  }

  // Método para crear un usuario
  // Método para crear un usuario
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // 1. Crear la entidad de usuario
    const user = this.userDomainService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.username,
      createUserDto.password,
    );

    // 2. Guardar el usuario
    const savedUser = await this.userRepository.save(user);

    // 3. Iterar sobre roleCediAssignments para validar y crear relaciones
    for (const assignment of createUserDto.roleCediAssignments) {
      // 3.1 Validar si el rol existe
      const role = await this.roleRepository.findById(assignment.roleId);
      if (!role) {
        throw new Error(`Role with ID ${assignment.roleId} not found`);
      }

      // 3.2 Validar si el Cedi existe
      const cedi = await this.cediRepository.findById(assignment.cediId);
      if (!cedi) {
        throw new Error(`Cedi with ID ${assignment.cediId} not found`);
      }

      // 3.3 Crear la relación entre el usuario, rol y cedi
      const cediUserRole = this.cediUserRoleDomainService.createRelation(
        savedUser,
        role,
        cedi,
      );

      // 3.4 Guardar la relación en el repositorio
      await this.cediUserRoleRepository.save(cediUserRole);
    }

    // 4. Retornar el usuario con el formato adecuado (Response DTO)
    return this.toResponseDto(savedUser);
  }

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
