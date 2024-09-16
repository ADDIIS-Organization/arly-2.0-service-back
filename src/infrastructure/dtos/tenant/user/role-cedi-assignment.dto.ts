import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
} from 'class-validator';

export class RoleCediAssignmentDto {
  @ApiProperty({
    description: 'The ID of the role assigned to the user',
    example: 1,
  })
  @IsNotEmpty({ message: 'Role ID must be specified' })
  roleId: number;

  @ApiProperty({
    description: 'The ID of the Cedi assigned to the user for this role',
    example: 1,
  })
  @IsNotEmpty({ message: 'Cedi ID must be specified' })
  cediId: number;
}
