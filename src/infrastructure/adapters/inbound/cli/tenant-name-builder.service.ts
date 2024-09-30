// src/infrastructure/adapters/inbound/cli/tenant-name-builder.service.ts
import { Injectable } from '@nestjs/common';
import { GuidGeneratorService } from './guid-generator.service';

@Injectable()
export class TenantNameBuilder {
  constructor(private readonly guidGeneratorService: GuidGeneratorService) {}

  buildTenantName(country: string, state: string): string {
    const guid = this.guidGeneratorService.generateGuid();
    return `${country}_${state}_${guid}`;
  }
}
