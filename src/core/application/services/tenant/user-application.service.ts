import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {
  UserResponseDto,
  CreateUserDto,
  UpdateUserDto,
} from '@/infrastructure/dtos/user';
import {
  UserDomainService,
  CediUserRoleDomainService,
} from '@/core/domain/services';
import {
  ICediRepositoryPort,
  ICediUserRoleRepositoryPort,
  IRoleRepositoryPort,
  IUserRepositoryPort,
} from '@/core/domain/ports/outbound';
import { IUserApplicationPort } from '../../ports/inbound';
import { CrudApplicationService } from '../common';
import { Role, User } from '@/core/domain/entities';

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
    private readonly cediUserRoleDomainService: CediUserRoleDomainService,
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

  // Método para convertir DTO en entidad, ahora con hash de contraseña
  protected toEntity(createDto: CreateUserDto): User {
    return this.userDomainService.createUser(
      createDto.name,
      createDto.email,
      createDto.username,
      createDto.password,
    );
  }

  // Método para actualizar una entidad
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
  async save(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // 1. Hashear la contraseña
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // 2. Actualizar la contraseña en el DTO
    createUserDto.password = hashedPassword;

    // 3. Convertir el DTO a entidad
    const user = this.toEntity(createUserDto);

    // 4. Guardar el usuario
    const savedUser = await this.userRepository.save(user);

    // 5. Validar y crear relaciones entre roles y cedis
    for (const assignment of createUserDto.roleCediAssignments) {
      console.log('Assignment', assignment);
      const role: Role = await this.roleRepository.findById(assignment.roleId);
      if (!role) {
        throw new Error(`Role with ID ${assignment.roleId} not found`);
      }

      const cedi = await this.cediRepository.findById(assignment.cediId);
      if (!cedi) {
        throw new Error(`Cedi with ID ${assignment.cediId} not found`);
      }

      const cediUserRole = this.cediUserRoleDomainService.createRelation(
        savedUser,
        role,
        cedi,
      );
      await this.cediUserRoleRepository.save(cediUserRole);
    }

    // 6. Retornar la respuesta en formato DTO
    return this.toResponseDto(savedUser);
  }

  // Método para hashear la contraseña
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  protected toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    };
  }
}
