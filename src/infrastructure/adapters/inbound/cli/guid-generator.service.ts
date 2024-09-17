// src/infrastructure/adapters/inbound/cli/guid-generator.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GuidGeneratorService {
  generateGuid(): string {
    return uuidv4();
  }
}
