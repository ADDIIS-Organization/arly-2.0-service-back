import { ApiProperty } from '@nestjs/swagger';

export class MuelleTurnoResponseDto {
  @ApiProperty({
    description: 'The ID of the turno',
    example: 1,
  })
  idturno: number;

  @ApiProperty({
    description: 'The ID of the client',
    example: 123,
    nullable: true,
  })
  idcliente: number | null;

  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
    nullable: true,
  })
  nombrecliente: string | null;

  @ApiProperty({
    description: 'The client address',
    example: '123 Main St.',
    nullable: true,
  })
  direccioncliente: string | null;

  @ApiProperty({
    description: 'The client phone number',
    example: '123-456-7890',
    nullable: true,
  })
  telefono: string | null;

  @ApiProperty({
    description: 'The client email',
    example: 'john.doe@example.com',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    description: 'The type of payment',
    example: 'Credit Card',
    nullable: true,
  })
  tipopago: string | null;

  @ApiProperty({
    description: 'Observations or comments',
    example: 'Client requested morning shift',
    nullable: true,
  })
  observacion: string | null;

  @ApiProperty({
    description: 'The ID of the activity type',
    example: 5,
    nullable: true,
  })
  idtipoactividad: number | null;

  @ApiProperty({
    description: 'The number of collaborators',
    example: 3,
    nullable: true,
  })
  cantidadcolaborador: number | null;

  @ApiProperty({
    description: 'Total minutes of the shift',
    example: 120,
    nullable: true,
  })
  minutos: number | null;

  @ApiProperty({
    description: 'The start date of the shift',
    example: '2023-09-01',
    nullable: true,
  })
  fechainicio: Date | null;

  @ApiProperty({
    description: 'The start time of the shift',
    example: '08:00:00',
    nullable: true,
  })
  horainicio: string | null;

  @ApiProperty({
    description: 'The end date of the shift',
    example: '2023-09-01',
    nullable: true,
  })
  fechafin: Date | null;

  @ApiProperty({
    description: 'The end time of the shift',
    example: '10:00:00',
    nullable: true,
  })
  horafin: string | null;

  @ApiProperty({
    description: 'Total shift value with IVA',
    example: 100.5,
    nullable: true,
  })
  valoriva: number | null;

  @ApiProperty({
    description: 'Percentage of retention',
    example: 10.5,
    nullable: true,
  })
  porcentajeretencion: number | null;

  @ApiProperty({
    description: 'Total retention value',
    example: 10.5,
    nullable: true,
  })
  valorretencion: number | null;

  @ApiProperty({
    description: 'Percentage of ICA retention',
    example: 4.75,
    nullable: true,
  })
  porcentajereteica: number | null;

  @ApiProperty({
    description: 'ReteIVA value',
    example: 5.0,
    nullable: true,
  })
  valorreteiva: number | null;

  @ApiProperty({
    description: 'Discount value',
    example: 2.0,
    nullable: true,
  })
  valordescuento: number | null;

  @ApiProperty({
    description: 'Subtotal value',
    example: 80.0,
    nullable: true,
  })
  subtotal: number | null;

  @ApiProperty({
    description: 'Total value',
    example: 100.5,
    nullable: true,
  })
  total: number | null;

  @ApiProperty({
    description: 'The license plate of the vehicle',
    example: 'XYZ-123',
    nullable: true,
  })
  placa: string | null;

  @ApiProperty({
    description: 'The name of the driver',
    example: 'Jane Doe',
    nullable: true,
  })
  nombreconductor: string | null;

  @ApiProperty({
    description: 'The phone number of the driver',
    example: '321-654-9870',
    nullable: true,
  })
  telefonoconductor: string | null;

  @ApiProperty({
    description: 'The registration date of the shift',
    example: '2023-09-01T10:30:00',
    nullable: true,
  })
  fecharegistro: Date | null;

  @ApiProperty({
    description: 'The closing date of the shift',
    example: '2023-09-01T12:00:00',
    nullable: true,
  })
  fechacierre: Date | null;

  @ApiProperty({
    description: 'The shift status',
    example: 'Completed',
    nullable: true,
  })
  estado: string | null;

  @ApiProperty({
    description: 'The company ID',
    example: 1,
    nullable: true,
  })
  idempresa: number | null;

  @ApiProperty({
    description: 'The dock ID',
    example: 10,
    nullable: true,
  })
  idmuelle: number | null;
}
