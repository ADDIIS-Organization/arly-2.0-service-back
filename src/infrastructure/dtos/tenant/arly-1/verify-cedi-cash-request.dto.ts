import { ApiProperty } from '@nestjs/swagger';

export class VerifyCediCashRequestDto {
  @ApiProperty({
    description: 'The alleged cash amount sent by the supervisor',
    example: 3000,
  })
  cashAmount?: number;
}
