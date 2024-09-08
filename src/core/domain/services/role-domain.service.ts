import { Injectable } from '@nestjs/common';

import { CreateRoleDto } from '@/infrastructure/dtos/role';
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
  createRole(name: string, description: string): CreateRoleDto {
    // Lógica de negocio pura: creación del role
    return Role.create(name, description);
  }
}