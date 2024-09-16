import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('darsec_invoices') // Nombre de la tabla
export class DarsecInvoiceEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'bill_number' })
  billNumber: string;

  @Column()
  date: Date;
}
