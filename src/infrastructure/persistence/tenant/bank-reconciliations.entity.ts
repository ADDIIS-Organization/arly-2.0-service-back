import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { BankTransactionEntity, DarsecInvoiceEntity } from './';

@Entity('bank_reconciliations') // Nombre de la tabla
export class BankReconciliationEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'arly_id' })
  arlyId: string;

  @ManyToOne(() => BankTransactionEntity)
  bankTransaction: BankTransactionEntity;

  @ManyToOne(() => DarsecInvoiceEntity)
  darsecInvoice: DarsecInvoiceEntity;
}
