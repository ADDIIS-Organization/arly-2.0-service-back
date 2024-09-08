import { ApiProperty } from '@nestjs/swagger';

export class CediResponseDto {
  @ApiProperty({
    description: 'The ID of the Cedi',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the Cedi',
    example: 'Central Warehouse',
  })
  name: string;

  @ApiProperty({
    description: 'The department of the Cedi',
    example: 'Logistics',
  })
  department: string;

  @ApiProperty({
    description: 'The municipality of the Cedi',
    example: 'New York',
  })
  municipality: string;

  @ApiProperty({
    description: 'The address of the Cedi',
    example: '123 Main St.',
  })
  address: string;

  @ApiProperty({
    description: 'The phone number of the Cedi',
    example: '123-456-7890',
  })
  phone: string;

  @ApiProperty({
    description: 'The primary email of the Cedi',
    example: 'contact@cedi.com',
  })
  primaryEmail: string;

  @ApiProperty({
    description: 'The secondary email of the Cedi',
    example: 'secondary@cedi.com',
    required: false,
  })
  secondaryEmail?: string;

  @ApiProperty({
    description: 'The supervisor of the Cedi',
    example: 'John Doe',
  })
  supervisor: string;

  @ApiProperty({
    description: 'The company that owns the Cedi',
    example: 'Acme Corp.',
  })
  company: string;
}
