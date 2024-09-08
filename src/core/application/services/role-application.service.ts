import { Injectable } from '@nestjs/common';

import { CreateRoleDto, RoleResponseDto } from '@/infrastructure/dtos/role';
import { IRoleApplicationPort } from '@/core/application/ports/inbound';
import { IRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { RoleDomainService } from '@/core/domain/services';
import { CrudApplicationService } from './common';
import { Role } from '@/core/domain/entities';

@Injectable()
export class RoleApplicationService
  extends CrudApplicationService<CreateRoleDto, RoleResponseDto>
  implements IRoleApplicationPort
{
  constructor(
    private readonly roleDomainService: RoleDomainService,
    private readonly roleRepository: IRoleRepositoryPort,
  ) {
    super(roleRepository);
  }

  // Implementación del método abstracto para convertir Role en RoleResponseDto
  protected toResponseDto(role: Role): RoleResponseDto {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }
}
