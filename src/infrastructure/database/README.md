# Datasource

Un datasource es un objeto que se encarga de manejar la conexión a la base de datos. En este caso tenemos dos datasources, uno para la conexion al esquema central de la base de datos de la aplicación y otro para la conexión al esquema tenant.

### ¿Por qué usar un datasource?

El datasource es una abstracción que nos permite manejar la conexión a la base de datos de una forma más sencilla. En este caso, el datasource se encarga de manejar la conexión a la base de datos de la aplicación y de cargar las entidades que se van a utilizar en la aplicación.

## CentralDatasource

Este datasource se encarga de manejar la conexión al esquema central de la base de datos de la aplicación.

```typescript
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import {
  CentralUserEntity,
  CentralRoleEntity,
  TenantEntity,
} from '../persistence/central';

export const createCentralDataSource = (configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
    password: configService.get<string>('DATABASE_PASSWORD', 'your_password'),
    database: configService.get<string>('DATABASE_NAME', 'central_db'),
    entities: [CentralUserEntity, CentralRoleEntity, TenantEntity],
    synchronize: configService.get<string>('NODE_ENV', false) !== 'production',
    schema: configService.get<string>('CENTRAL_SCHEMA', 'central_schema'),
  });
};
```

### Explicación

- **type**: Tipo de base de datos a la que se va a conectar. En este caso es postgres.
- **host**: Host de la base de datos. Hace referencia a la dirección IP o al nombre del host de la base de datos. Por defecto es `localhost`.
- **port**: Puerto de la base de datos. Por defecto es `5432`.
- **username**: Usuario de la base de datos. Por defecto es `postgres`.
- **password**: Contraseña del usuario de la base de datos. Por defecto es `your_password`.
- **database**: Nombre de la base de datos a la que se va a conectar. Por defecto es `central_db`.
- **entities**: Entidades que se van a utilizar en la aplicación. Estas entidades son las que se van a mapear a las tablas de la base de datos. Es muy importante que se especifiquen todas las entidades que se van a utilizar en la aplicación en el orden correcto, o sea, de entidades que no tienen dependencias a entidades que tienen dependencias de otras entidades.
- **synchronize**: Esta opción se utiliza para sincronizar las entidades con la base de datos. En producción se recomienda desactivar esta opción puesto que puede causar problemas de rendimiento, problemas de seguridad, perdida de datos, entre otros. Por defecto es `false`.
- **schema**: Esquema de la base de datos. En este caso es el esquema central de la base de datos especifica albergada en las variables de entorno. Por defecto es `central_schema`.

## TenantDatasource

Este datasource se encarga de manejar la conexión al esquema tenant de la base de datos de la aplicación.

```typescript
// src/infrastructure/database/tenant-data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  BankReconciliationEntity,
  BankTransactionEntity,
  CediRoleUserEntity,
  CediEntity,
  DarsecInvoiceEntity,
  MenuItemEntity,
  ModuleEntity,
  PermissionEntity,
  RoleEntity,
  TaxEntity,
  UserEntity,
} from '../persistence/tenant';

export const createTenantDataSource = (schema: string, configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
    password: configService.get<string>('DATABASE_PASSWORD', ''),
    database: configService.get<string>('DATABASE_NAME', 'central_db'),
    schema: schema, // Cambia el esquema dinámicamente según el tenant
    entities: [
      BankReconciliationEntity,
      BankTransactionEntity,
      CediRoleUserEntity,
      CediEntity,
      DarsecInvoiceEntity,
      MenuItemEntity,
      ModuleEntity,
      PermissionEntity,
      RoleEntity,
      TaxEntity,
      UserEntity,
    ],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
  });
};
```

### Explicación

- **type**: Tipo de base de datos a la que se va a conectar. En este caso es postgres.
- **host**: Host de la base de datos. Hace referencia a la dirección IP o al nombre del host de la base de datos.
- **port**: Puerto de la base de datos. Por defecto es 5432.
- **username**: Usuario de la base de datos.
- **password**: Contraseña del usuario de la base de datos.
- **database**: Nombre de la base de datos a la que se va a conectar.
- **schema**: Esquema de la base de datos. En este caso es el esquema tenant de la base de datos. Aqui voy a hacer un alto puesto que este esquema se cambia dinámicamente según el tenant. Esto se logra gracias a la configuración de TypeORM, claramente se debe tener en cuenta que el esquema debe existir en la base de datos para que se pueda conectar.