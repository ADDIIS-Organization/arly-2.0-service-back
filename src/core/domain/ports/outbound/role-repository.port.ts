import { IGenericRepositoryPort } from './common';
import { Role } from '../../entities';

export interface IRoleRepositoryPort extends IGenericRepositoryPort<Role> {
  findByName(name: string): Promise<Role | null>;
}
