import { UserResponseDto } from "@/infrastructure/dtos/tenant/user/user-response.dto";
import { CreateUserDto } from "@/infrastructure/dtos/tenant/user/create-user.dto";
import { UpdateUserDto } from "@/infrastructure/dtos/tenant/user/update-role.dto";
import { IBaseCRUDApplicationPort } from "./common/base-crud-application.port";

/**
 * IUserApplicationPort interface represents the contract for managing users in the application.
 */
export interface IUserApplicationPort
  extends IBaseCRUDApplicationPort<UserResponseDto, CreateUserDto, UpdateUserDto> {
  /**
   * Retrieves a user by their username.
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the UserResponseDto.
   */
  getByUsername(username: string): Promise<UserResponseDto>;
}