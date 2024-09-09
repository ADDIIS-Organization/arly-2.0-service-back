import { Injectable } from '@nestjs/common';

import { CediUserRole, User, Role, Cedi } from '@/core/domain/entities';

/**
 * Servicio de dominio encargado de gestionar la relación Cedi-User-Role.
 */
@Injectable()
export class CediUserRoleDomainService {
  /**
   * Crea una nueva instancia de CediUserRole en el dominio.
   * 
   * @param user - El usuario.
   * @param role - El rol.
   * @param cedi - El cedi.
   * @returns Una nueva instancia de CediUserRole.
   */
  createRelation(user: User, role: Role, cedi: Cedi): CediUserRole {
    return CediUserRole.create(user, role, cedi);
  }
}
