import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('taxes') // Nombre de la tabla
export class TaxEntity {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  name: string;

  @Column()
  description: string;

  @Column()
  amount: string;

  @Column({ name: 'unit_of_measure' })
  unitOfMeasure: string;
}
