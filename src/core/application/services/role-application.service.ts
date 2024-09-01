import { RoleApplication } from '../ports/role-application.port';
import { RoleService } from '../../domain/ports/inbound/role-service.port';
import { Role } from '../../domain/entities/role.entity';
import { RoleResponseDto } from '../../../infrastructure/dtos/role-response.dto';

export class RoleApplicationService implements RoleApplication {
    constructor(private roleService: RoleService) {}

    async createRole(name: string, description: string): Promise<RoleResponseDto> {
        const role = Role.create(name, description);
        const createdRole = await this.roleService.create(role);
        return this.mapToDto(createdRole);
    }

    async getAllRoles(): Promise<RoleResponseDto[]> {
        const roles = await this.roleService.findAll();
        return roles.map(role => this.mapToDto(role));
    }

    async getRoleById(id: number): Promise<RoleResponseDto> {
        const role = await this.roleService.findById(id);
        return this.mapToDto(role);
    }

    async updateRole(id: number, name: string, description: string): Promise<RoleResponseDto> {
        const role = await this.roleService.findById(id);
        role.update(name, description);
        const updatedRole = await this.roleService.update(id, role);
        return this.mapToDto(updatedRole);
    }

    async deleteRole(id: number): Promise<void> {
        return this.roleService.delete(id);
    }

    private mapToDto(role: Role): RoleResponseDto {
        return {
            id: role.id,
            name: role.name,
            description: role.description
        };
    }
}