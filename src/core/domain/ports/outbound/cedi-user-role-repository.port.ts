import { CediUserRole, User, Role, Cedi } from '@/core/domain/entities';
import { IGenericRepositoryPort } from './common'; // Importar la interfaz genérica

// Heredamos de la interfaz genérica para las operaciones CRUD básicas
export interface ICediUserRoleRepositoryPort extends IGenericRepositoryPort<CediUserRole> {
  createRelation(cediUserRole: CediUserRole): Promise<CediUserRole>;
  // Los métodos CRUD vienen de la herencia de IGenericRepositoryPort
}
