import { Injectable } from '@nestjs/common';

import {
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@/infrastructure/dtos/role';
import { IRoleApplicationPort } from '@/core/application/ports/inbound';
import { IRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { RoleDomainService } from '@/core/domain/services';
import { CrudApplicationService } from './common';
import { Role } from '@/core/domain/entities';

@Injectable()
export class RoleApplicationService
  extends CrudApplicationService<
    Role,
    CreateRoleDto,
    UpdateRoleDto,
    RoleResponseDto
  >
  implements IRoleApplicationPort
{
  constructor(
    private readonly roleDomainService: RoleDomainService,
    private readonly roleRepository: IRoleRepositoryPort,
  ) {
    super(roleRepository);
  }

  // Creación de la entidad usando el servicio de dominio
  protected toEntity(createRoleDto: CreateRoleDto): Role {
    return this.roleDomainService.createRole(
      createRoleDto.name,
      createRoleDto.description,
    );
  }

  // Actualización del Role usando su propio método update
  protected async toUpdatedEntity(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) throw new Error('Role not found');

    // Se pueden aplicar más reglas de negocio aquí de ser necesario
    role.update(updateRoleDto.name, updateRoleDto.description);
    return role;
  }

  protected toResponseDto(role: Role): RoleResponseDto {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }
}
