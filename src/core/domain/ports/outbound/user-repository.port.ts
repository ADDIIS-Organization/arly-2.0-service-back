import { IGenericRepositoryPort } from './common';
import { User } from '../../entities';

export interface IUserRepositoryPort extends IGenericRepositoryPort<User> {
  findByUserName(userName: string): Promise<User | null>;
}
