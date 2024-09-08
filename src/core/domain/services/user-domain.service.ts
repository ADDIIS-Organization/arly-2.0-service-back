import { Injectable } from '@nestjs/common';

import { User } from '../entities';

/**
 * Represents a service for managing users in the domain.
 *
 * This file is intended for the business logic of the application.
 * In the case of the entity `createUser`, it is a pure business logic operation.
 * We just create a new User with the given attributes. Domain-specific logic
 * could be applied here if necessary.
 */
@Injectable()
export class UserDomainService {
  /**
   * Creates a new User entity.
   *
   * @param name - The name of the User.
   * @param email - The email of the User.
   * @param username - The username of the User.
   * @param password - The password of the User.
   * @returns The newly created User entity.
   */
  createUser(
    name: string,
    email: string,
    username: string,
    password: string,
  ): User {
    // Aquí podría ir la lógica adicional de negocio, como validaciones o reglas
    return User.create(name, email, username, password);
  }

  /**
   * Additional domain logic could go here, such as validation, User-specific rules, etc.
   */
}
