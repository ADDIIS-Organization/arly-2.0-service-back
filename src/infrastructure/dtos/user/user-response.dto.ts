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

}
