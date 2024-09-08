import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/core/domain/entities/role.entity';
import { Cedi } from '@/core/domain/entities/cedi.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'The unique ID of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe123',
  })
  username: string;

  @ApiProperty({
    description: 'The role assigned to the user',
    type: Role, // Assumes you have a Role entity or class defined
  })
  roles: Role[];

  @ApiProperty({
    description: 'List of Cedi locations assigned to the user',
    type: [Cedi], // Assumes you have a Cedi entity or class defined
  })
  cedis: Cedi[];
}
