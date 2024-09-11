import { TenantEntity } from '@/infrastructure/persistence';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
