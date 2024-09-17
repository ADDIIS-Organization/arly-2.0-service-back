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
    // Ejecutar dentro de una transacción
    const queryRunner = this.centralDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Paso 1: Crear el esquema en la base de datos
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${tenantName}"`);

      // Paso 2: Registrar el tenant en la tabla central
      const tenantRepository: Repository<TenantEntity> = queryRunner.manager.getRepository(TenantEntity);
      const newTenant = tenantRepository.create({ name: tenantName });
      await tenantRepository.save(newTenant);

      // Paso 3: Confirmar la transacción para hacer visible el esquema
      await queryRunner.commitTransaction();

      // Paso 4: Inicializar el esquema del tenant (fuera de la transacción)
      await this.initializeTenantSchema(tenantName);
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw new Error(`Error al crear el tenant: ${error.message}`);
    } finally {
      // Liberar el queryRunner
      await queryRunner.release();
    }
  }

  private async initializeTenantSchema(schemaName: string): Promise<void> {
    // Crear un DataSource específico para el nuevo esquema
    const tenantDataSource = createTenantDataSource(schemaName, this.configService);

    // Inicializar la conexión
    await tenantDataSource.initialize();

    // Ejecutar migraciones en el esquema del tenant
    await tenantDataSource.runMigrations();

    // Cerrar la conexión
    await tenantDataSource.destroy();
  }
}
