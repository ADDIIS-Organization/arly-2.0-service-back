import { IsOptional, IsString, IsEmail, Length, Matches, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'The name must be between 2 and 50 characters' })
  name?: string;

  @ApiPropertyOptional({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'johndoe123',
  })
  @IsOptional()
  @IsString()
  @Length(4, 20, { message: 'The username must be between 4 and 20 characters' })
  @Matches(/^[a-zA-Z0-9-_]+$/, { message: 'The username can only contain letters, numbers, hyphens, and underscores' })
  username?: string;

  @ApiPropertyOptional({
    description: 'The password of the user',
    example: 'strongP@ssw0rd',
  })
  @IsOptional()
  @IsString()
  @Length(8, 100, { message: 'The password must be at least 8 characters long' })
  password?: string;

  @ApiPropertyOptional({
    description: 'The ID of the role assigned to the user',
    example: 1,
  })
  @IsOptional()
  roleId?: number;

  @ApiPropertyOptional({
    description: 'List of IDs for the associated Cedi locations',
    example: [1, 2],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Cedi must be an array of IDs' })
  cediIds?: number[];
}
