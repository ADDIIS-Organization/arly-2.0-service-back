import { Role } from '../../entities/role.entity';

export interface RoleRepository {
    save(role: Role): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: number): Promise<Role>;
    update(id: number, role: Role): Promise<Role>;
    delete(id: number): Promise<void>;
}