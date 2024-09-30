import { IGenericRepositoryPort } from "./common/generic-repository.port";
import { CediRoleUser } from "../../entities/cedi-user-role.entity";

// Heredamos de la interfaz genérica para las operaciones CRUD básicas
export interface ICediRoleUserRepositoryPort extends IGenericRepositoryPort<CediRoleUser> {
  createRelation(CediRoleUser: CediRoleUser): Promise<CediRoleUser>;
  findByUserId(userId: number): Promise<CediRoleUser[]>;
}
