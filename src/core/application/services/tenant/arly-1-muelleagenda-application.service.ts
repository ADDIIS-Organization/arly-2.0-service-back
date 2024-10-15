import { IArly1MuelleAgendaRepositoryPort } from '@/core/domain/ports/outbound/arly-1-muelleagenda-repository.port';
import { VerifyCediCashResponseDto } from '@/infrastructure/dtos/tenant/arly-1/verify-cedi-cash-response.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IArly1MuelleAgendaApplicationPort } from '../../ports/inbound/arly-1-muelle-agenda-application.port';

@Injectable()
export class Arly1MuelleAgendaApplicationService 
  implements IArly1MuelleAgendaApplicationPort
{
  constructor(
    @Inject('IArly1MuelleAgendaRepositoryPort')
    private readonly arly1MuelleAgendaRepository: IArly1MuelleAgendaRepositoryPort,
  ) {}
  async verifyCediCash(
    cediId: string,
    cashAmount: number,
  ): Promise<VerifyCediCashResponseDto> {
    // query arly datasource to muelleagenda where cediId = cediId
    const muelleAgendas =
      await this.arly1MuelleAgendaRepository.findByCediId(cediId);
    console.log('muelleAgendas', muelleAgendas);
    return null;
  }
}
