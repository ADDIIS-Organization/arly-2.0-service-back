import { DataSource, EntityTarget, Repository } from 'typeorm';
import { Request } from 'express';

import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

import { createTenantDataSource } from '@/infrastructure/database/tenant-data.source';
import { TenantEntity } from '@/infrastructure/persistence/central/tenant.entity';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private dataSourceMap: Map<string, DataSource> = new Map();
  private tenantSchema: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly centralDataSource: DataSource,  // DataSource de la base central
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
    const dataSource = createTenantDataSource(tenantId, this.configService);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    return dataSource;
  }

  private getTenantIdFromRequest(): string {
    const tenantId = this.request.headers['tenant-id'] as string;
    return tenantId;
  }

  // Verificar si el tenant existe en la base de datos central
  async validateTenantExists(tenantId: string): Promise<void> {
    const tenantRepository: Repository<TenantEntity> =
      this.centralDataSource.getRepository(TenantEntity);
    const tenant = await tenantRepository.findOne({
      where: { name: tenantId },
    });

    if (!tenant) {
      throw new HttpException(
        `Tenant with ID ${tenantId} does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getRepository<Entity>(entity: EntityTarget<Entity>) {
    const dataSource = await this.getDataSource();
    return dataSource.getRepository(entity);
  }
}

/**
 * EntityTarget<Entity> es un tipo genérico que se utiliza para referenciar una entidad de TypeORM.
 */
