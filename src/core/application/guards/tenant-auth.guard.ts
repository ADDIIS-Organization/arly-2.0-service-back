import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TenantRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant-repository.adapter';
import { TenantContextService } from '@/core/application/services/tenant-context.service';

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
      throw new Error('No se proporcionó clientId');
    }

    // Obtener el tenant desde la base de datos central
    const tenant = await this.tenantRepository.findTenantByClientId(clientId);

    if (!tenant) {
      throw new Error('Inquilino no encontrado');
    }

    // Almacenamos el esquema en el contexto de AsyncLocalStorage
    this.tenantContextService.run(tenant.schema, () => {
      // Continuamos la ejecución con el esquema almacenado en el contexto
    });

    return true;
  }
}
