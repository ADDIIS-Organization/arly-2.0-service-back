import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DarsecInvoiceEntity } from '@/infrastructure/persistence/tenant/darsec-invoices.entity';

@Injectable()
export class DarsecInvoiceRepository {
  constructor(
    @InjectRepository(DarsecInvoiceEntity)
    private readonly repository: Repository<DarsecInvoiceEntity>,
  ) {}

  async save(invoice: DarsecInvoiceEntity): Promise<DarsecInvoiceEntity> {
    return this.repository.save(invoice);
  }
}
