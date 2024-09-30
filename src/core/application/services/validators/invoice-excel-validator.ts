import { Injectable } from '@nestjs/common';
import { ExcelValidatorPort } from 'src/core/domain/ports/outbound/excel-validator.port';

@Injectable()
export class InvoiceExcelValidator implements ExcelValidatorPort {
  private readonly EXPECTED_COLUMNS = ['Número', 'Fecha', 'Nombre', 'Total'];

  validateColumns(columns: string[]): boolean {
    return this.EXPECTED_COLUMNS.every(col => columns.includes(col));
  }
}
