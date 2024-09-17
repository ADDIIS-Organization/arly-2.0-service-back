import * as readlineSync from 'readline-sync';  // Usar directamente
import { Command } from 'nestjs-command';

import { Injectable } from '@nestjs/common';

import { TenantAdminService } from '@/core/application/services';
import { TenantNameBuilder } from '.';

@Injectable()
export class CreateTenantCommand {
  constructor(
    private readonly tenantAdminService: TenantAdminService,
    private readonly tenantNameBuilder: TenantNameBuilder
  ) {}

  @Command({
    command: 'create:tenant',
    describe: 'Crea un nuevo tenant solicitando país y estado, y generando un GUID',
  })
  async create() {
    console.log("Iniciando la creación del tenant...");

    try {
      // Paso 1. Obtener la entrada del usuario
      const { country, state } = this.getUserInput();

      // Paso 2. Generar el nombre del tenant de manera declarativa
      const tenantName = this.tenantNameBuilder.buildTenantName(country, state);

      console.log(`Creando tenant con nombre: ${tenantName}`);

      // Paso 3. Llamar a TenantAdminService para crear el tenant
      await this.tenantAdminService.createTenant(tenantName);
      console.log('Tenant creado exitosamente.');
    } catch (error) {
      console.error(`Error al crear el tenant: ${error.message}`);
    }
  }

  /**
   * Method to gather input from the user
   */
  private getUserInput(): { country: string, state: string } {
    const country = readlineSync.question('Ingrese el país: ');
    let state = readlineSync.question('Ingrese el estado (o N si no aplica): ');

    // Verificar si el estado es "N" y asignar 'dc'
    if (state.toUpperCase() === 'N') {
      state = 'dc';
    }

    return { country, state };
  }
}
