import { Role } from '@/core/domain/entities/role.entity';
import { RoleResponseDto } from 'src/infrastructure/dtos/role-response.dto';

/**
 * RoleApplication interface represents the contract for managing roles in the application.
 */
export interface RoleApplication {
  createRole(name: string, description: string): Promise<RoleResponseDto>;
  getAllRoles(): Promise<RoleResponseDto[]>;
  getRoleById(id: number): Promise<RoleResponseDto>;
  updateRole(
    id: number,
    name: string,
    description: string,
  ): Promise<RoleResponseDto>;
  deleteRole(id: number): Promise<void>;
}
