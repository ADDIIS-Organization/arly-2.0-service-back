import { UserResponseDto } from "@/infrastructure/dtos/tenant/user/user-response.dto";
import { CreateUserDto } from "@/infrastructure/dtos/tenant/user/create-user.dto";
import { UpdateUserDto } from "@/infrastructure/dtos/tenant/user/update-role.dto";
import { IBaseApplicationPort } from "./common/crud-application.port";

/**
 * IUserApplicationPort interface represents the contract for managing users in the application.
 */
export interface IUserApplicationPort
  extends IBaseApplicationPort<UserResponseDto, CreateUserDto, UpdateUserDto> {
  getByUsername(username: string): Promise<UserResponseDto>;
}
