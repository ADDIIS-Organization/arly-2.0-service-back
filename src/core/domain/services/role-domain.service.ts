import { Role } from '../entities/role.entity';
import { RoleRepository } from '../ports/outbound/role-repository.port';
import { RoleService } from '../ports/inbound/role-service.port';

export class RoleDomainService implements RoleService {
  constructor(private repository: RoleRepository) {}

  async create(role: Role): Promise<Role> {
    return this.repository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<Role> {
    return this.repository.findById(id);
  }

  async update(id: number, role: Role): Promise<Role> {
    return this.repository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
