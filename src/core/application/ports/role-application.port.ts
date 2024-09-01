import { RoleResponseDto } from 'src/infrastructure/dtos/role-response.dto';
import { Role } from '../../domain/entities/role.entity';

/**
 * RoleApplication interface represents the contract for managing roles in the application.
 */
export interface RoleApplication {
    createRole(name: string, description: string): Promise<RoleResponseDto>;
    getAllRoles(): Promise<RoleResponseDto[]>;
    getRoleById(id: number): Promise<RoleResponseDto>;
    updateRole(id: number, name: string, description: string): Promise<RoleResponseDto>;
    deleteRole(id: number): Promise<void>;
}