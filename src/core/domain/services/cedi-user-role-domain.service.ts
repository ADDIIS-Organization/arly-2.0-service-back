import { Injectable } from '@nestjs/common';

import { CediRoleUser, User, Role, Cedi } from '@/core/domain/entities';

/**
 * Servicio de dominio encargado de gestionar la relación Cedi-User-Role.
 */
@Injectable()
export class CediRoleUserDomainService {
  /**
   * Crea una nueva instancia de CediRoleUser en el dominio.
   * 
   * @param user - El usuario.
   * @param role - El rol.
   * @param cedi - El cedi.
   * @returns Una nueva instancia de CediRoleUser.
   */
  createRelation(user: User, role: Role, cedi: Cedi): CediRoleUser {
    return CediRoleUser.create(user, role, cedi);
  }
}
