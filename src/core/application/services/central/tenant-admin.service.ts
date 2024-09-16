import { DataSource, Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { TenantEntity } from '@/infrastructure/persistence/central';
import { createTenantDataSource } from '@/infrastructure/database';

@Injectable()
export class TenantAdminService {
  constructor(
    private readonly centralDataSource: DataSource, // Conexión al esquema central
    private readonly configService: ConfigService,
  ) {}

  async createTenant(tenantName: string): Promise<void> {
    // Paso 1: Crear el esquema en la base de datos
    await this.centralDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${tenantName}"`);

    // Paso 2: Registrar el tenant en la tabla central
    const tenantRepository: Repository<TenantEntity> = this.centralDataSource.getRepository(TenantEntity);
    const newTenant = tenantRepository.create({
      name: tenantName,
      schemaName: tenantName,
      // Otros campos necesarios
    });
    await tenantRepository.save(newTenant);

    // Paso 3: Inicializar el esquema del tenant
    await this.initializeTenantSchema(tenantName);
  }

  private async initializeTenantSchema(schemaName: string): Promise<void> {
    // Crear un DataSource específico para el nuevo esquema
    const tenantDataSource = createTenantDataSource(schemaName, this.configService);

    // Inicializar el DataSource
    await tenantDataSource.initialize();

    // Ejecutar migraciones en el esquema del tenant
    await tenantDataSource.runMigrations();

    // Opcional: Ejecutar seeders para poblar datos iniciales

    // Cerrar la conexión
    await tenantDataSource.destroy();
  }
}
