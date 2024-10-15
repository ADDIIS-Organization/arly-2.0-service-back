import { MuelleAgenda } from '../../entities/arly-1-muelle-agenda.entity';

export interface IArly1MuelleAgendaRepositoryPort {
  findByCediId(cediId: string): Promise<MuelleAgenda[]>;
}