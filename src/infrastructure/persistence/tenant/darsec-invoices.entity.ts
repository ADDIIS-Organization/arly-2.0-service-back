import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('darsec_invoices') // Nombre de la tabla
export class DarsecInvoiceEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'bill_number' })
  billNumber: string;

  @Column({ name: 'bill_date' })
  billDate: Date;

  @Column({ name: 'bill_amount', type: 'decimal', precision: 10, scale: 2 }) // Cambia a decimal para aceptar decimales
  billAmount: number;

  @Column({ name: 'customer_name' })
  customerName: string;
}