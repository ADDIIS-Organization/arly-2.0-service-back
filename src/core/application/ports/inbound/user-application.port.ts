import {
  CreateUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@/infrastructure/dtos/tenant/user';
import { IBaseApplicationPort } from './common';

/**
 * IUserApplicationPort interface represents the contract for managing users in the application.
 */
export interface IUserApplicationPort
  extends IBaseApplicationPort<UserResponseDto, CreateUserDto, UpdateUserDto> {
  getByUsername(username: string): Promise<UserResponseDto>;
}
