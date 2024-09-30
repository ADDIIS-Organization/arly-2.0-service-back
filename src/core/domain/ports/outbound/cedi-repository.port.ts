import { Cedi } from "../../entities/cedi.entity";
import { IGenericRepositoryPort } from "./common/generic-repository.port";

export interface ICediRepositoryPort extends IGenericRepositoryPort<Cedi> {
    findByName(name: string): Promise<Cedi | null>;
}
