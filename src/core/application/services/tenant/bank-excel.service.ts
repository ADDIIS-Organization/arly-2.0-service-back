import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { TenantContextService } from './tenant-context.service';
import { BankTransactionEntity } from '@/infrastructure/persistence/tenant/bank-transactions.entity';

@Injectable()
export class BankTransactionExcelService {
  constructor(private readonly tenantContextService: TenantContextService) {}

  private excelDateToJSDate(serial: number): Date {
    const excelStartDate = new Date(1900, 0, 1);
    const daysOffset = serial - 2;
    excelStartDate.setDate(excelStartDate.getDate() + daysOffset);
    return excelStartDate;
  }

  private parseDate(dateValue: any): Date | null {
    if (typeof dateValue === 'number') {
      return this.excelDateToJSDate(dateValue);
    } else {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    }
  }

  private isValidRow(row: any): boolean {
    return row['Fecha'] &&
      row['Código'] &&
      row['Concepto'] &&
      row['Tipo'] &&
      row['Documento'] &&
      row['Oficina' ] && 
      row['Monto']

    ;
  }

  private parseAmount(amountValue: any): number | null {
    const amount = parseFloat(amountValue);
    return isNaN(amount) ? null : amount;
  }

  async processExcel(buffer: Buffer): Promise<any> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    const transactionRepository = await this.tenantContextService.getRepository(
      BankTransactionEntity,
    );

    const savedTransactions = await Promise.all(
      jsonData.map(async (row) => {
        console.log(JSON.stringify(row));
        if (!this.isValidRow(row)) {
          console.log(`Fila inválida ignorada: ${JSON.stringify(row)}`);
          return null;
        }

        const transaction = new BankTransactionEntity();

        const transactionDate = this.parseDate(row['Fecha']);
        if (!transactionDate) {
          throw new Error(`Invalid date format for row: ${JSON.stringify(row)}`);
        }
        transaction.date = transactionDate.toISOString();

        transaction.code = row['Código'];
        transaction.concept = row['Concepto'];
        transaction.type = row['Tipo'] || '';
        transaction.document = row['Documento'];
        transaction.office = row['Oficina'];

        const transactionAmount = this.parseAmount(row['Monto']);
        if (!transactionAmount) {
          throw new Error(
            `Invalid amount format for row: ${JSON.stringify(row)}`,
          );
        }
        transaction.amount = transactionAmount;

        return transactionRepository.save(transaction);
      }),
    );

    return savedTransactions.filter((transaction) => transaction !== null);
  }
}
