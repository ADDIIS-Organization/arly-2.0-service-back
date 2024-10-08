import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { CentralUserEntity } from '../persistence/central/central-user.entity';
import { CentralRoleEntity } from '../persistence/central/central-role.entity';
import { TenantEntity } from '../persistence/central/tenant.entity';


export const createCentralDataSource = (configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
    password: configService.get<string>('DATABASE_PASSWORD', ''),
    database: configService.get<string>('DATABASE_NAME', 'central_db'),
    entities: [CentralUserEntity, CentralRoleEntity, TenantEntity],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    schema: configService.get<string>('CENTRAL_SCHEMA', 'central_schema'),
  });
};
