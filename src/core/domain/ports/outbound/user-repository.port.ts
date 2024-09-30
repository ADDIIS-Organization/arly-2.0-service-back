import { IGenericRepositoryPort } from "./common/generic-repository.port";
import { User } from "../../entities/user.entity";

export interface IUserRepositoryPort extends IGenericRepositoryPort<User> {
  findByUserName(userName: string): Promise<User | null>;
}
