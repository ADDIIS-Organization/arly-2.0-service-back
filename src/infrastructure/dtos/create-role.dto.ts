import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role' })
  name: string;

  @ApiProperty({ description: 'A description of the role' })
  description: string;
}
