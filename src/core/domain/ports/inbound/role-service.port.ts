import { Role } from '../../entities/role.entity';

export interface RoleService {
    create(role: Role): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: number): Promise<Role>;
    update(id: number, role: Role): Promise<Role>;
    delete(id: number): Promise<void>;
}