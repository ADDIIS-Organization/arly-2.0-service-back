import * as bcrypt from 'bcrypt';

import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import {
  CentralUserEntity,
  TenantEntity,
} from '@/infrastructure/persistence/central';
import {
  RoleRepositoryAdapter,
  CediRepositoryAdapter,
} from '@/infrastructure/adapters/outbound/repositories';
import {
  RoleEntity,
  UserEntity,
  CediEntity,
  CediRoleUserEntity,
} from '@/infrastructure/persistence';
import { createTenantDataSource } from '@/infrastructure/database';
import {
  IRoleRepositoryPort,
  ICediRepositoryPort,
} from '@/core/domain/ports/outbound';
import {
  seedRoles,
  seedCedis,
  seedModules,
} from '@/infrastructure/seeds/tenant';
import { seedMenuItems } from '@/infrastructure/seeds/tenant/menu-item.seed';
import { seedPermissions } from '@/infrastructure/seeds/tenant/permission.seed';

@Injectable()
export class TenantAdminService {
  constructor(
    private readonly centralDataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async createTenant(tenantName: string): Promise<void> {
    const queryRunner = this.centralDataSource.createQueryRunner();

    try {
      console.log('Conectando queryRunner...');
      await queryRunner.connect();
      console.log('Conectado.');

      console.log('Iniciando transacción...');
      await queryRunner.startTransaction();
      console.log('Transacción iniciada.');

      console.log(`Creando esquema: ${tenantName}`);
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${tenantName}"`);

      console.log('Guardando tenant en la base de datos central...');
      const tenantRepository: Repository<TenantEntity> =
        queryRunner.manager.getRepository(TenantEntity);
      const newTenant = tenantRepository.create({ name: tenantName });
      await tenantRepository.save(newTenant);

      console.log('Confirmando la transacción...');
      await queryRunner.commitTransaction();
      console.log('Transacción confirmada.');

      console.log('Inicializando el esquema del tenant...');
      const tenantDataSource = await this.initializeTenantSchema(tenantName);

      console.log('Ejecutando seeders...');
      await this.runSeeders(tenantDataSource, tenantName);
    } catch (error) {
      console.error('Error en la transacción: ', error);

      if (queryRunner.isTransactionActive) {
        console.log('Revirtiendo la transacción...');
        await queryRunner.rollbackTransaction();
      }

      throw new Error(`Error al crear el tenant: ${error.message}`);
    } finally {
      if (!queryRunner.isReleased) {
        console.log('Liberando queryRunner...');
        await queryRunner.release();
      }
    }
  }

  private async initializeTenantSchema(
    schemaName: string,
  ): Promise<DataSource> {
    const tenantDataSource = createTenantDataSource(
      schemaName,
      this.configService,
    );

    await tenantDataSource.initialize();
    await tenantDataSource.runMigrations();

    return tenantDataSource;
  }

  private async runSeeders(
    tenantDataSource: DataSource,
    tenantName: string,
  ): Promise<void> {
    console.log('Ejecutando seeders...');
    await seedModules(tenantDataSource);
    await seedMenuItems(tenantDataSource);
    await seedRoles(tenantDataSource);
    await seedPermissions(tenantDataSource);
    await seedCedis(tenantDataSource);
    await this.seedUsers(tenantDataSource, tenantName);
    console.log('Seeders ejecutados correctamente.');
  }

  private async seedUsers(
    tenantDataSource: DataSource,
    tenantName: string,
  ): Promise<void> {
    console.log('Creando usuarios en el tenant...');

    const userRepository = tenantDataSource.getRepository(UserEntity);
    const centralUserRepository =
      this.centralDataSource.getRepository(CentralUserEntity);
    const roleRepository = tenantDataSource.getRepository(RoleEntity);
    const cediRepository = tenantDataSource.getRepository(CediEntity);
    const cediRoleUserRepository =
      tenantDataSource.getRepository(CediRoleUserEntity);
    const tenantRepository = this.centralDataSource.getRepository(TenantEntity);

    const superAdminRole = await roleRepository.findOne({
      where: { name: 'superAdmin' },
    });
    const adminRole = await roleRepository.findOne({
      where: { name: 'admin' },
    });
    const supervisorRole = await roleRepository.findOne({
      where: { name: 'supervisor' },
    });

    const defaultCedi = await cediRepository.findOne({
      where: { name: 'CEDI Principal' },
    });
    const newTenant = await tenantRepository.findOne({
      where: { name: tenantName },
    });

    const centralUser1 = await this.ensureCentralUser(
      centralUserRepository,
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        username: 'superadmin',
        password: await this.hashPassword('password123'),
      },
      newTenant,
    );

    const centralUser2 = await this.ensureCentralUser(
      centralUserRepository,
      {
        name: 'Admin',
        email: 'admin@example.com',
        username: 'admin',
        password: await this.hashPassword('password123'),
      },
      newTenant,
    );

    const centralUser3 = await this.ensureCentralUser(
      centralUserRepository,
      {
        name: 'Supervisor',
        email: 'supervisor@example.com',
        username: 'supervisor',
        password: await this.hashPassword('password123'),
      },
      newTenant,
    );

    await this.createUserWithRoleAndCedi(
      userRepository,
      cediRoleUserRepository,
      centralUser1,
      superAdminRole,
      defaultCedi,
    );
    await this.createUserWithRoleAndCedi(
      userRepository,
      cediRoleUserRepository,
      centralUser2,
      adminRole,
      defaultCedi,
    );
    await this.createUserWithRoleAndCedi(
      userRepository,
      cediRoleUserRepository,
      centralUser3,
      supervisorRole,
      defaultCedi,
    );
    console.log('Usuarios creados y roles asignados.');
  }

  private async createUserWithRoleAndCedi(
    userRepository: Repository<UserEntity>,
    cediRoleUserRepository: Repository<CediRoleUserEntity>,
    centralUser: CentralUserEntity,
    role: RoleEntity,
    cedi: CediEntity,
  ): Promise<void> {
    const tenantUser = userRepository.create({
      centralUserId: centralUser.id,
    });
    await userRepository.save(tenantUser); // Guardamos el usuario en el tenant, esto ya en base de datos del tenant

    const cediRoleUser = cediRoleUserRepository.create({
      user: tenantUser,
      role: role,
      cedi: cedi,
    });
    await cediRoleUserRepository.save(cediRoleUser);
  }

  private async ensureCentralUser(
    centralUserRepository: Repository<CentralUserEntity>,
    userData: {
      name: string;
      email: string;
      username: string;
      password: string;
    },
    tenant: TenantEntity, // Pasamos tenant aquí
  ): Promise<CentralUserEntity> {
    let user = await centralUserRepository.findOne({
      where: { email: userData.email },
      relations: ['tenants'], // Aseguramos cargar la relación con tenants
    });

    if (!user) {
      console.log(`Creando usuario central: ${userData.name}`);
      user = centralUserRepository.create(userData);
      user.tenants = [tenant]; // Asociamos el nuevo tenant
      await centralUserRepository.save(user);
    } else {
      console.log(`Usuario central ${userData.name} ya existe.`);

      // Verificamos si el tenant ya está asociado, si no, lo agregamos
      if (!user.tenants.some((t) => t.id === tenant.id)) {
        user.tenants.push(tenant); // Añadimos el tenant
        await centralUserRepository.save(user); // Guardamos la relación actualizada
      }
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
