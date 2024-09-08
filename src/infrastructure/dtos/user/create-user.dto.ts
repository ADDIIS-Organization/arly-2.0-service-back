import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length, Matches, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString() // Must be a string
  @IsNotEmpty({ message: 'The name cannot be empty' }) // Should not be empty
  @Length(2, 50, { message: 'The name must be between 2 and 50 characters' }) // Length restrictions
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' }) // Must be a valid email format
  @IsNotEmpty({ message: 'The email cannot be empty' }) // Email must not be empty
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe123',
  })
  @IsString()
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @Length(4, 20, { message: 'The username must be between 4 and 20 characters' }) // Length for username
  @Matches(/^[a-zA-Z0-9-_]+$/, { message: 'The username can only contain letters, numbers, hyphens, and underscores' }) // Regex to ensure only alphanumeric, hyphens, underscores
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty({ message: 'The password cannot be empty' })
  @Length(8, 100, { message: 'The password must be at least 8 characters long' }) // Minimum length for password
  password: string;

  @ApiProperty({
    description: 'The ID of the role assigned to the user',
    example: 1,
  })
  @IsNotEmpty({ message: 'Role must be specified' })
  roleId: number; // This assumes you're sending the role by its ID

  @ApiProperty({
    description: 'List of IDs for the associated Cedi locations',
    example: [1, 2],
    type: [Number]
  })
  @IsArray({ message: 'Cedi must be an array of IDs' }) // Should be an array of Cedi IDs
  @IsNotEmpty({ message: 'At least one Cedi must be specified' })
  cediIds: number[]; // An array of Cedi IDs
}
