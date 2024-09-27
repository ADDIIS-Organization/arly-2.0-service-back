import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TenantEntity } from '@/infrastructure/persistence';
@Injectable()
export class TenantInfoRepositoryAdapter {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async findTenantByClientId(clientId: string): Promise<TenantEntity> {
    return this.tenantRepository.findOne({ where: { name: clientId } });
  }
}
