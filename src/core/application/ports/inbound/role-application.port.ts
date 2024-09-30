import { RoleResponseDto } from "@/infrastructure/dtos/tenant/role/role-response.dto";
import { CreateRoleDto } from "@/infrastructure/dtos/tenant/role/create-role.dto";
import { UpdateRoleDto } from "@/infrastructure/dtos/tenant/role/update-role.dto";
import { IBaseApplicationPort } from "./common/crud-application.port";

/**
 * IRoleApplicationPort interface represents the contract for managing roles in the application.
 */
export interface IRoleApplicationPort
  extends IBaseApplicationPort<RoleResponseDto, CreateRoleDto, UpdateRoleDto> {}
