import { MuelleAgenda } from '@/core/domain/entities/arly-1-muelle-agenda.entity';
import { IArly1MuelleAgendaRepositoryPort } from '@/core/domain/ports/outbound/arly-1-muelleagenda-repository.port';
import { MuelleAgendaEntity } from '@/infrastructure/persistence/tenant/arly1/arly1-muelleagenda.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class Arly1MuelleAgendaRepositoryAdapter
  implements IArly1MuelleAgendaRepositoryPort
{
  constructor(
    @InjectRepository(MuelleAgendaEntity, 'ARLY1_DATA_SOURCE') // Inyectamos el repositorio del DataSource secundario
    private readonly repository: Repository<MuelleAgendaEntity>,
  ) {}

  async findByCediId(cediId: string): Promise<MuelleAgenda[]> {
    // query arly datasource to muelleagenda where cediId = cediId and fechaapertura = today
    const muelleAgendas = await this.repository.find({
      where: { idsede: +cediId, fechaapertura: new Date() },
    });
    console.log('muelleAgendas', muelleAgendas);
    return null
  }
}
