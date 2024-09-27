import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { TenantRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { TenantContextService } from '../services/tenant';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(
    private readonly tenantRepository: TenantRepositoryAdapter,
    private readonly tenantContextService: TenantContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const clientId = request.headers['client-id'] || request.body.clientId;

    if (!clientId) {
      throw new UnauthorizedException('Client ID is missing');
    }

    // Obtener el tenant desde la base de datos central
    const tenant = await this.tenantRepository.findTenantByClientId(clientId);

    if (!tenant) {
      throw new Error('Inquilino no encontrado');
    }

    this.tenantContextService.setTenantSchema(tenant.schema);

    return true;
  }
}
