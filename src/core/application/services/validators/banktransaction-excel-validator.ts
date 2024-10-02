import { BankTransactionExcelValidatorPort } from '@/core/domain/ports/outbound/banktransaction-excel-validator.port';
import { Injectable } from '@nestjs/common';


@Injectable()
export class BankTransactionExcelValidator implements BankTransactionExcelValidatorPort {
  private readonly EXPECTED_COLUMNS = [
    'Fecha',
    'Código',
    'Concepto',
    'Tipo',
    'Documento',
    'Oficina',
    'Monto',
  ];

  validateColumns(columns: string[]): boolean {
    return this.EXPECTED_COLUMNS.every((col) => columns.includes(col));
  }
}
