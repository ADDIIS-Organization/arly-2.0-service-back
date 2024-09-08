import { Injectable } from '@nestjs/common';

import { Role } from '../entities';

/**
 * Represents a service for managing roles in the domain.
 * 
 * This file is intended for the business logic of the application.
 * In the case of createRole, it is a pure business logic operation. We
 * just create a new role with the given name and description. But 
 */
@Injectable()
export class RoleDomainService {
  /**
   * Creates a new Role entity.
   *
   * @param name - The name of the role.
   * @param description - The description of the role.
   * @returns The newly created Role entity.
   */
  createRole(name: string, description: string): Role {
    // Lógica de negocio pura: crear una entidad de Role
    return Role.create(name, description);
  }

  /**
   * Additional domain logic could go here, such as validation, role-specific rules, etc.
   */
}