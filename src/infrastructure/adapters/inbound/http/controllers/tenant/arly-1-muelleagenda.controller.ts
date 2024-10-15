import { IArly1MuelleAgendaApplicationPort } from '@/core/application/ports/inbound/arly-1-muelle-agenda-application.port';
import { Arly1MuelleAgendaApplicationService } from '@/core/application/services/tenant/arly-1-muelleagenda-application.service';
import { ApiGetAllOperation } from '@/documentation/swagger/common/api-search.decorator';

import { VerifyCediCashRequestDto } from '@/infrastructure/dtos/tenant/arly-1/verify-cedi-cash-request.dto';
import { VerifyCediCashResponseDto } from '@/infrastructure/dtos/tenant/arly-1/verify-cedi-cash-response.dto';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('arly-1-muelleagenda')
@Controller('arly-1-muelleagenda')
export class Arly1MuelleagendaController {
  constructor(
    @Inject('IArly1MuelleAgendaApplicationPort')
    private readonly arly1MuelleAgendaApplicationService: IArly1MuelleAgendaApplicationPort,
  ) {}

  @Post(':cediId/verify-cash')
  @ApiOperation({
    summary:
      'Verify if the cash amount in muelle agenda matches the provided amount for a cediId',
  })
  @ApiGetAllOperation('MuelleAgenda')
  @ApiBody({ type: VerifyCediCashRequestDto })
  async verifyCediCash(
    @Param('cediId') cediId: string,
    @Body() verifyCashDto: VerifyCediCashRequestDto,
  ): Promise<VerifyCediCashResponseDto> {
    return this.arly1MuelleAgendaApplicationService.verifyCediCash(
      cediId,
      verifyCashDto.cashAmount,
    );
  }
}
