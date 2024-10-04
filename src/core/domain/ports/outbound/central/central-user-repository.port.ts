import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { CreateUserDto } from '@/infrastructure/dtos/tenant/user/create-user.dto';
import { User } from '@/core/domain/entities/user.entity';

// Interface for CentralUserRepositoryAdapter
export interface ICentralUserRepositoryPort {
  /**
   * Saves a user to the central database.
   * @param userDto - Data transfer object containing user details to create.
   * @returns A promise that resolves to the created User entity.
   */
  createCentralUser(userDto: CreateUserDto): Promise<User>;

  /**
   * Finds a user by email including related tenants.
   * @param email - The email of the user to find.
   * @returns A promise that resolves to the CentralUserEntity with related tenants.
   */
  findByEmailWithTenants(email: string): Promise<CentralUserEntity>;
}
