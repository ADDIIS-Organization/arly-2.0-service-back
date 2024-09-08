import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@/infrastructure/dtos/role';
import { RoleApplicationService } from '@/core/application/services';
import { BaseCRUDController } from './common'; // Import IBaseApplicationPort

@ApiTags('roles')
@Controller('roles')
export class RoleController extends BaseCRUDController<
  RoleResponseDto,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(roleApplicationService: RoleApplicationService) {
    super(roleApplicationService);
  }
}
