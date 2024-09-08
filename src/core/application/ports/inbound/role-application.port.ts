import {
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
} from '@/infrastructure/dtos/role';
import { IBaseApplicationPort } from './common';

/**
 * IRoleApplicationPort interface represents the contract for managing roles in the application.
 */
export interface IRoleApplicationPort
  extends IBaseApplicationPort<RoleResponseDto, CreateRoleDto, UpdateRoleDto> {}
