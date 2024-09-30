import { Inject, Injectable } from '@nestjs/common';

import { IRoleRepositoryPort } from '@/core/domain/ports/outbound/role-repository.port';
import { RoleResponseDto } from '@/infrastructure/dtos/tenant/role/role-response.dto';
import { CreateRoleDto } from '@/infrastructure/dtos/tenant/role/create-role.dto';
import { UpdateRoleDto } from '@/infrastructure/dtos/tenant/role/update-role.dto';
import { IRoleApplicationPort } from '../../ports/inbound/role-application.port';
import { RoleDomainService } from '@/core/domain/services/role-domain.service';
import { CrudApplicationService } from '../common/crud-application.service';
import { Role } from '@/core/domain/entities/role.entity';

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
    @Inject('IRoleRepositoryPort') // Usamos @Inject con el token del puerto
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
