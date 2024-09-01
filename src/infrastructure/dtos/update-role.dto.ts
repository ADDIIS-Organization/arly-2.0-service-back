import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({ description: 'The updated name of the role' })
  name?: string;

  @ApiPropertyOptional({ description: 'The updated description of the role' })
  description?: string;
}
