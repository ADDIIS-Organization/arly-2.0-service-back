import { IGenericRepositoryPort } from './common';
import { Cedi } from '../../entities';

export interface ICediRepositoryPort extends IGenericRepositoryPort<Cedi> {
    findByName(name: string): Promise<Cedi | null>;
}
