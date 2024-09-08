import { Injectable } from '@nestjs/common';

import { User } from '../entities';

/**
 * Represents a service for managing users in the domain.
 * 
 * This file is intended for the business logic of the application.
 * In the case of the entity createUser, it is a pure business logic operation. We
 * just create a new User with the given name and description. But 
 */
@Injectable()
export class UserDomainService {
  /**
   * Creates a new User entity.
   *
   * @param name - The name of the User.
   * @param description - The description of the User.
   * @returns The newly created User entity.
   */
  createUser(name: string, description: string): User {
    // Lógica de negocio pura: crear una entidad de User
    return User.create(name, description);
  }

  /**
   * Additional domain logic could go here, such as validation, User-specific rules, etc.
   */
}