import { Injectable } from '@nestjs/common';
import { CediRoleUser } from '../entities/cedi-user-role.entity';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Cedi } from '../entities/cedi.entity';

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
