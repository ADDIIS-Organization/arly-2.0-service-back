import { Role } from "../../entities/role.entity";
import { IGenericRepositoryPort } from "./common/generic-repository.port";


export interface IRoleRepositoryPort extends IGenericRepositoryPort<Role> {
  findByName(name: string): Promise<Role | null>;
}
