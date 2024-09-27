import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCediDto {
  @ApiProperty({
    description: 'The name of the Cedi',
    example: 'Central Warehouse',
  })
  @IsString()
  @IsNotEmpty({ message: 'The name of the Cedi cannot be empty' })
  name: string;

  @ApiProperty({
    description: 'The department of the Cedi',
    example: 'Logistics',
  })
  @IsString()
  @IsNotEmpty({ message: 'The department cannot be empty' })
  department: string;

  @ApiProperty({
    description: 'The municipality of the Cedi',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty({ message: 'The municipality cannot be empty' })
  municipality: string;

  @ApiProperty({
    description: 'The address of the Cedi',
    example: '123 Main St.',
  })
  @IsString()
  @IsNotEmpty({ message: 'The address cannot be empty' })
  address: string;

  @ApiProperty({
    description: 'The phone number of the Cedi',
    example: '123-456-7890',
  })
  @IsString()
  @IsNotEmpty({ message: 'The phone cannot be empty' })
  phone: string;

  @ApiProperty({
    description: 'The primary email of the Cedi',
    example: 'contact@cedi.com',
  })
  @IsEmail({}, { message: 'Invalid primary email' })
  @IsNotEmpty({ message: 'The primary email cannot be empty' })
  primaryEmail: string;

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
  @IsNotEmpty({ message: 'The supervisor cannot be empty' })
  supervisor: string;

  @ApiProperty({
    description: 'The company that owns the Cedi',
    example: 'Acme Corp.',
  })
  @IsString()
  @IsNotEmpty({ message: 'The company cannot be empty' })
  company: string;
}
