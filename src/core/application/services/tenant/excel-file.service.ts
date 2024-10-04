import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { TenantContextService } from './tenant-context.service';
import { DarsecInvoiceEntity } from '@/infrastructure/persistence/tenant/darsec-invoices.entity';

@Injectable()
export class ExcelFileService {
  constructor(private readonly tenantContextService: TenantContextService) {}

  // Función para convertir números seriales de Excel en fechas
  private excelDateToJSDate(serial: number): Date {
    const excelStartDate = new Date(1900, 0, 1); // 1 de enero de 1900 es el punto de partida en Excel
    const daysOffset = serial - 2; // Ajuste necesario porque Excel considera 1900 como un año bisiesto (no lo es)
    excelStartDate.setDate(excelStartDate.getDate() + daysOffset);
    return excelStartDate;
  }

  // Función para validar si una cadena puede ser convertida a una fecha válida
  private parseDate(dateValue: any): Date | null {
    if (typeof dateValue === 'number') {
      // Si el valor es un número, se asume que es un serial de Excel
      return this.excelDateToJSDate(dateValue);
    } else {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    }
  }

  // Verificar si la fila tiene todos los datos requeridos
  private isValidRow(row: any): boolean {
    return row['Número'] && row['Fecha'] && row['Total'] && row['Nombre'];
  }

  // Validar que los montos sean números válidos
  private parseAmount(amountValue: any): number | null {
    const amount = parseFloat(amountValue);
    return isNaN(amount) ? null : amount;
  }

  async processExcel(buffer: Buffer): Promise<any> {
    // Leer el archivo Excel desde el buffer
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Tomar la primera hoja
    const sheet = workbook.Sheets[sheetName];

    // Convertir la hoja de cálculo a formato JSON
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    // Obtener el repositorio del tenant
    const invoiceRepository = await this.tenantContextService.getRepository(DarsecInvoiceEntity);

    // Guardar cada fila en la base de datos del tenant correspondiente
    const savedInvoices = await Promise.all(
      jsonData.map(async (row) => {
        // Ignorar filas que no sean válidas (e.g., filas con totales)
        if (!this.isValidRow(row)) {
          console.log(`Fila inválida ignorada: ${JSON.stringify(row)}`);
          return null; // Retornamos null para las filas que no deben procesarse
        }
        console.log(JSON.stringify(row));

        const invoice = new DarsecInvoiceEntity();
        invoice.id = row['Número'];
        invoice.billNumber = row['Número'];

        // Validar y convertir la fecha antes de insertarla
        const billDate = this.parseDate(row['Fecha']);
        if (!billDate) {
          throw new Error(`Invalid date format for row with ID: ${row['Número']}`);
        }
        invoice.billDate = billDate;

        // Validar y convertir el monto antes de insertarlo
        const billAmount = this.parseAmount(row['Total']);
        if (!billAmount) {
          throw new Error(`Invalid amount format for row with ID: ${row['Número']}`);
        }
        invoice.billAmount = billAmount;

        invoice.customerName = row['Nombre'];

        return invoiceRepository.save(invoice);
      }),
    );

    // Filtrar los null para no incluir las filas inválidas en la respuesta final
    return savedInvoices.filter((invoice) => invoice !== null);
  }
}
