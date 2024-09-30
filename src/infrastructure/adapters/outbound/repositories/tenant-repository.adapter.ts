import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createTenantDataSource } from '@/infrastructure/database/tenant-data.source';

@Injectable()
export class TenantRepositoryAdapter {
  private tenantDataSources: Map<string, DataSource> = new Map();

  constructor(private readonly configService: ConfigService) {}

  // Establecer la conexión al esquema del tenant
  async setTenant(schema: string) {
    if (!this.tenantDataSources.has(schema)) {
      const dataSource = createTenantDataSource(schema, this.configService);
      await dataSource.initialize();
      this.tenantDataSources.set(schema, dataSource);
    }

    const dataSource = this.tenantDataSources.get(schema);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    await dataSource.query(`SET search_path TO ${schema}`);
  }

  // Obtener la conexión al esquema del tenant
  getConnection(schema: string): DataSource {
    const dataSource = this.tenantDataSources.get(schema);
    if (!dataSource || !dataSource.isInitialized) {
      throw new Error(`No se pudo establecer la conexión con el esquema: ${schema}`);
    }
    return dataSource;
  }

  // Buscar el esquema del tenant basado en el clientId
  async findTenantByClientId(clientId: string): Promise<{ schema: string }> {
    // Simulación de búsqueda en la base de datos central
    // Debes implementar la lógica para buscar el esquema del tenant real basado en el clientId
    return { schema: `tenant_${clientId}` };
  }
}
