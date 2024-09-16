import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length, Matches, IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { RoleCediAssignmentDto } from './role-cedi-assignment.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @Length(2, 50, { message: 'The name must be between 2 and 50 characters' })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'The email cannot be empty' })
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe123',
  })
  @IsString()
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @Length(4, 20, { message: 'The username must be between 4 and 20 characters' })
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'The username can only contain letters, numbers, hyphens, and underscores',
  })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty({ message: 'The password cannot be empty' })
  @Length(8, 100, { message: 'The password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    description: 'List of role and Cedi combinations assigned to the user',
    type: [RoleCediAssignmentDto],
  })
  @IsArray({ message: 'Role-Cedi assignments must be an array' })
  @ArrayNotEmpty({ message: 'At least one Role-Cedi assignment must be provided' })
  @ValidateNested({ each: true })
  @Type(() => RoleCediAssignmentDto) // Necesario para que class-validator valide los elementos anidados
  roleCediAssignments: RoleCediAssignmentDto[];
}
