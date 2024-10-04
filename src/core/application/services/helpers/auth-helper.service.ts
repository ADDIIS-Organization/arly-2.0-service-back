import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

/**
 * AuthHelperService: Encargado de la lógica auxiliar de autenticación,
 * como la validación de contraseñas utilizando métodos seguros.
 */
@Injectable()
export class AuthHelperService {
  /**
   * Verifica si la contraseña proporcionada coincide con la contraseña almacenada.
   * @param plainPassword - La contraseña proporcionada por el usuario.
   * @param hashedPassword - La contraseña almacenada de forma segura.
   * @returns Una promesa que resuelve en un booleano indicando si la contraseña es válida.
   */
  async isPasswordValid(plainPassword: string, hashedPassword: string): Promise<boolean> {
    // Uso del método asíncrono bcrypt.compare para evitar bloquear el event loop.
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
