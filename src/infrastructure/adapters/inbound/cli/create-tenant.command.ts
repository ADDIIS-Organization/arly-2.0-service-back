import * as readlineSync from 'readline-sync'; // Para solicitar inputs por consola
import { v4 as uuidv4 } from 'uuid'; // Generar un GUID
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

import { TenantAdminService } from '@/core/application/services';

@Injectable()
export class CreateTenantCommand {
  constructor(private readonly tenantAdminService: TenantAdminService) {}

  @Command({
    command: 'create:tenant', // Nombre del comando
    describe: 'Crea un nuevo tenant solicitando país y estado, y generando un GUID',
  })
  async create() {
    // Paso 1. Solicitar los datos por consola
    const { country, state } = this.getUserInput();

    // Paso 3. Generar automáticamente un GUID
    const guid = uuidv4();

    // Paso 4. Crear el nombre del tenant combinando país, estado y GUID

    const tenantName = `${country}_${state}_${guid}`;

    console.log(`Creando tenant con nombre: ${tenantName}`);

    // Paso 5. Llamar a TenantAdminService para crear el tenant
    try {
      await this.tenantAdminService.createTenant(tenantName);
      console.log('Tenant creado exitosamente.');
    } catch (error) {
      console.error(`Error al crear el tenant: ${error.message}`);
    }
  }

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
