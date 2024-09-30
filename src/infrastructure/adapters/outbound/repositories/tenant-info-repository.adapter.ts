import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TenantEntity } from '@/infrastructure/persistence/central/tenant.entity';
@Injectable()
export class TenantInfoRepositoryAdapter {
  constructor(
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async findTenantByClientId(clientId: string): Promise<TenantEntity> {
    return this.tenantRepository.findOne({ where: { name: clientId } });
  }
}
