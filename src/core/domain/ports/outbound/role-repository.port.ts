import { IGenericRepositoryPort } from './common';
import { Role } from '@/core/domain/entities';

export interface IRoleRepositoryPort extends IGenericRepositoryPort<Role> {
  findByName(name: string): Promise<Role | null>;
}
