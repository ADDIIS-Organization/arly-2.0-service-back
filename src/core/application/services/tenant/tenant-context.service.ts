import { DataSource, EntityTarget } from 'typeorm';
import { Request } from 'express';

import { Injectable, Scope, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

import { createTenantDataSource } from '@/infrastructure/database/tenant-data.source';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private dataSourceMap: Map<string, DataSource> = new Map();
  private tenantSchema: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  setTenantSchema(schema: string): void {
    this.tenantSchema = schema;
  }

  getTenantSchema(): string {
    if (!this.tenantSchema) {
      throw new Error('El esquema del tenant no está establecido');
    }
    return this.tenantSchema;
  }

  async getDataSource(): Promise<DataSource> {
    const tenantSchema = this.getTenantSchema();
  
    if (!tenantSchema) {
      throw new Error('El esquema del tenant no está establecido');
    }
  
    if (this.dataSourceMap.has(tenantSchema)) {
      const existingDataSource = this.dataSourceMap.get(tenantSchema);
      if (existingDataSource.isInitialized) {
        return existingDataSource;
      }
    }
  
    const newDataSource = await this.createTenantDataSource(tenantSchema);
    this.dataSourceMap.set(tenantSchema, newDataSource);
  
    return newDataSource;
  }
  
  private async createTenantDataSource(tenantId: string): Promise<DataSource> {
    // Se crea y configura el DataSource para el tenant
    // Esto para que se conecte al esquema correspondiente
    const dataSource = createTenantDataSource(tenantId, this.configService);

    // Inicializa el DataSource si no está inicializado, esto para evitar la inicialización múltiple
    // y la creación de múltiples conexiones a la base de datos bajo el mismo tenant
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    return dataSource;
  }

  private getTenantIdFromRequest(): string {
    2;
    const tenantId = this.request.headers['tenant-id'] as string;
    return tenantId;
  }

  async getRepository<Entity>(entity: EntityTarget<Entity>) {
    const dataSource = await this.getDataSource();
    return dataSource.getRepository(entity);
  }
}

/**
 * EntityTarget<Entity> es un tipo genérico que se utiliza para referenciar una entidad de TypeORM.
 */
