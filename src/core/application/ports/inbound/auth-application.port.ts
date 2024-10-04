import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';

export interface IAuthApplicationPort {
  /**
   * Valida un usuario con sus credenciales (nombre de usuario y contraseña).
   * @param username - El nombre de usuario o correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns Una promesa que resuelve con la entidad del usuario si es válido.
   * @throws UnauthorizedException si las credenciales no son válidas.
   */
  validateUser(username: string, password: string): Promise<CentralUserEntity>;

  /**
   * Inicia sesión para un usuario y genera un token JWT.
   * @param user - La entidad del usuario que está iniciando sesión.
   * @param tenantId - (Opcional) El ID del tenant al que se desea acceder.
   * @returns Un objeto con el token de acceso y la información del tenant, o una lista de tenants si el usuario tiene múltiples.
   * @throws UnauthorizedException si no tiene acceso al tenant especificado o si no tiene tenants asignados.
   */
  login(user: CentralUserEntity, tenantId?: number): Promise<{
    access_token?: string;
    tenant?: {
      id: number;
      name: string;
    };
    tenants?: {
      id: number;
      name: string;
    }[];
  }>;
}
