import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DarsecInvoiceRepository } from '@/infrastructure/adapters/outbound/repositories/tenant/darsec-invoice.repository';
import { ExcelFileController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/excel-file.controller';
import { InvoiceExcelValidator } from 'src/core/application/services/validators/invoice-excel-validator';
import { TenantContextService } from '@/core/application/services/tenant/tenant-context.service';
import { DarsecInvoiceEntity } from '@/infrastructure/persistence/tenant/darsec-invoices.entity';
import { ExcelFileService } from 'src/core/application/services/tenant/excel-file.service';


console.log('ExcelFileService:', ExcelFileService);
@Module({
  imports: [TypeOrmModule.forFeature([DarsecInvoiceEntity])],
  controllers: [ExcelFileController],
  providers: [
    DarsecInvoiceEntity,
    ExcelFileService,
    DarsecInvoiceRepository,
    TenantContextService,
    {
      provide: 'ExcelValidatorPort',
      useClass: InvoiceExcelValidator,
    },
  ],
})
export class ExcelFileModule {}
