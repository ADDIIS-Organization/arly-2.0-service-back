import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('bank_transactions') // Nombre de la tabla
export class BankTransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  date: string;

  @Column()
  code: number;

  @Column()
  concept: string;

  @Column()
  type: string; // Ajusta el tipo a enum según el caso

  @Column()
  document: number;

  @Column()
  office: string;

  @Column('double')
  amount: number;
}
