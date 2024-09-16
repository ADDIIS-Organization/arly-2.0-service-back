import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCediDto {
  @ApiProperty({
    description: 'The name of the Cedi',
    example: 'Central Warehouse',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The department of the Cedi',
    example: 'Logistics',
  })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({
    description: 'The municipality of the Cedi',
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  municipality?: string;

  @ApiProperty({
    description: 'The address of the Cedi',
    example: '123 Main St.',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'The phone number of the Cedi',
    example: '123-456-7890',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'The primary email of the Cedi',
    example: 'contact@cedi.com',
  })
  @IsEmail({}, { message: 'Invalid primary email' })
  @IsOptional()
  primaryEmail?: string;

  @ApiProperty({
    description: 'The secondary email of the Cedi (optional)',
    example: 'secondary@cedi.com',
  })
  @IsEmail({}, { message: 'Invalid secondary email' })
  @IsOptional()
  secondaryEmail?: string;

  @ApiProperty({
    description: 'The supervisor of the Cedi',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  supervisor?: string;

  @ApiProperty({
    description: 'The company that owns the Cedi',
    example: 'Acme Corp.',
  })
  @IsString()
  @IsOptional()
  company?: string;
}
