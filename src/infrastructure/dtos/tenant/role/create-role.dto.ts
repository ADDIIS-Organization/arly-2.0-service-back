import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsString() // El valor debe ser una cadena
  @IsNotEmpty({ message: 'The name of the role cannot be empty' }) // No debe estar vacío
  @Length(3, 50, { message: 'The name must be between 3 and 50 characters long' }) // Longitud mínima y máxima
  @Matches(/^[a-zA-Z0-9-_ ]+$/, { message: 'The name can only contain alphanumeric characters, spaces, hyphens, and underscores' }) // Solo caracteres alfanuméricos, espacios, guiones y guiones bajos
  name: string;

  @ApiProperty({
    description: 'A description of the role',
    example: 'Role with administrator privileges',
  })
  @IsString() // El valor debe ser una cadena
  @IsNotEmpty({ message: 'The description cannot be empty' }) // No debe estar vacía
  @Length(10, 255, { message: 'The description must be between 10 and 255 characters long' }) // Longitud mínima y máxima
  description: string;
}
