import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CediUserRoleEntity, RoleEntity, UserEntity } from '../persistence';


export const createTenantDataSource = (schema: string, configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
    password: configService.get<string>('DATABASE_PASSWORD', ''),
    database: configService.get<string>('DATABASE_NAME', 'central_db'),
    schema: schema,  // Cambia el esquema según el tenant
    entities: [
      UserEntity,
      RoleEntity,
      CediUserRoleEntity
        
    ],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
  });
};
