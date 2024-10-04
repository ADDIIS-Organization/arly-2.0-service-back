import { Injectable } from '@nestjs/common';
import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { TenantEntity } from '@/infrastructure/persistence/central/tenant.entity';

/**
 * TenantFactory: Encargado de encapsular la lógica de determinación de tenants.
 * Se encarga de seleccionar el tenant adecuado para el usuario, basándose en la
 * lista de tenants asignados al usuario y en el ID del tenant proporcionado.
 */
@Injectable()
export class TenantFactory {
  /**
   * Determina el tenant adecuado a partir de la información del usuario y el tenantId proporcionado.
   * @param user - La entidad del usuario con sus tenants.
   * @param tenantId - (Opcional) El ID del tenant al que se desea acceder.
   * @returns Un TenantEntity o una lista de tenants si el usuario tiene múltiples.
   */
  createTenant(user: CentralUserEntity, tenantId?: number): TenantEntity | { id: number; name: string }[] {
    // Verifica si el usuario no tiene tenants asignados
    if (this.userHasNoTenants(user)) {
      throw new Error('El usuario no tiene tenants asignados.');
    }

    // Si se proporciona un tenantId, buscar ese tenant específico
    if (tenantId) {
      return this.findTenantById(user.tenants, tenantId);
    }

    // Si el usuario tiene un solo tenant, devolverlo directamente. Si tiene múltiples, devolver la lista
    return this.resolveTenants(user.tenants);
  }

  /**
   * Verifica si el usuario no tiene tenants asignados.
   * @param user - La entidad del usuario.
   * @returns Verdadero si el usuario no tiene tenants, falso en caso contrario.
   */
  private userHasNoTenants(user: CentralUserEntity): boolean {
    return user.tenants.length === 0;
  }

  /**
   * Busca el tenant correspondiente al ID proporcionado.
   * @param tenants - Lista de tenants del usuario.
   * @param tenantId - El ID del tenant a buscar.
   * @returns El TenantEntity correspondiente o lanza un error si no se encuentra.
   */
  private findTenantById(tenants: TenantEntity[], tenantId: number): TenantEntity {
    // Busca el tenant dentro de la lista de tenants del usuario
    const tenant = tenants.find((t) => t.id === tenantId);
    if (!tenant) {
      throw new Error('Acceso denegado al tenant especificado.');
    }
    return tenant;
  }

  /**
   * Resuelve los tenants asignados al usuario.
   * @param tenants - Lista de tenants del usuario.
   * @returns Un TenantEntity si hay un solo tenant, o una lista de tenants si hay múltiples.
   */
  private resolveTenants(tenants: TenantEntity[]): TenantEntity | { id: number; name: string }[] {
    // Si el usuario tiene un solo tenant, devolverlo
    if (tenants.length === 1) {
      return tenants[0];
    }
    // Si el usuario tiene múltiples tenants, devolver un resumen de cada uno
    return this.mapTenantsToSummary(tenants);
  }

  /**
   * Devuelve todos los tenants en un formato reducido.
   * @param tenants - Lista de tenants del usuario.
   * @returns Una lista de objetos con id y nombre de cada tenant.
   */
  private mapTenantsToSummary(tenants: TenantEntity[]): { id: number; name: string }[] {
    // Mapea cada tenant a un formato simplificado con solo id y nombre
    return tenants.map(({ id, name }) => ({ id, name }));
  }
}
