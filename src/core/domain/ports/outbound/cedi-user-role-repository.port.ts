import { CediRoleUser, User, Role, Cedi } from '@/core/domain/entities';
import { IGenericRepositoryPort } from './common'; // Importar la interfaz genérica

// Heredamos de la interfaz genérica para las operaciones CRUD básicas
export interface ICediRoleUserRepositoryPort extends IGenericRepositoryPort<CediRoleUser> {
  createRelation(CediRoleUser: CediRoleUser): Promise<CediRoleUser>;
  findByUserId(userId: number): Promise<CediRoleUser[]>;
}
