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
    const country = readlineSync.question('Ingrese el país: ');
    let state = readlineSync.question('Ingrese el estado (o N si no aplica): ');

    // Paso 2. Si no hay estado, establecer como 'dc' (distrito capital)
    if (state.toUpperCase() === 'N') {
      state = 'dc';
    }

    // Paso 3. Generar automáticamente un GUID
    const guid = uuidv4();

    // Paso 4. Crear el nombre del tenant combinando país, estado y GUID

    const tenantName = `${country}_${state}_${guid}`;

    console.log(`Creando tenant con nombre: ${tenantName}`);

    // Llamar a TenantAdminService para crear el tenant
    try {
      await this.tenantAdminService.createTenant(tenantName);
      console.log('Tenant creado exitosamente.');
    } catch (error) {
      console.error(`Error al crear el tenant: ${error.message}`);
    }
  }
}
