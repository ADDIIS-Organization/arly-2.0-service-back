import { ApiProperty } from '@nestjs/swagger';

export class VerifyCediCashResponseDto {
  @ApiProperty({
    description:
      'The alleged cash amount sent by the supervisor matches the cash amount in the muelle agenda',
    example: false,
  })
  isMatch: boolean;

  @ApiProperty({
    description: 'The cash amount calculated from the muelle agenda',
    example: 1000,
  })
  calculatedCash?: number;
}
