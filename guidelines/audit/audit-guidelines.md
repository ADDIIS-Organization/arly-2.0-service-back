
# Auditoría de Cambios para CediRoleUserEntity

Este documento detalla cómo esta implementada el proceso auditoría (trazabilidad) tomando como ejemplo la entidad `CediRoleUserEntity` en nuestra aplicación NestJS utilizando TypeORM. La estrategia utiliza una tabla de auditoría separada para registrar todas las operaciones importantes (creación, actualización y eliminación) con información sobre **quién** realizó la operación y **cuándo** ocurrió.

## 1. Crear la Tabla de Auditoría

### Paso 1: Crear la Entidad de Auditoría

Primero, crea una nueva entidad para la tabla de auditoría. Esta tabla almacenará la información sobre las acciones realizadas en la entidad `CediRoleUserEntity`.

Crea un archivo llamado `cedi-role-user-audit.entity.ts` dentro de la carpeta `entities`:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('cedi_role_user_audit')
export class CediRoleUserAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityId: number; // Id de la entidad original

  @Column({ type: 'varchar' })
  action: string; // Acción realizada (CREATE, UPDATE, DELETE)

  @Column({ type: 'jsonb', nullable: true })
  oldValue: Record<string, any>; // Valor anterior (en caso de UPDATE)

  @Column({ type: 'jsonb', nullable: true })
  newValue: Record<string, any>; // Valor nuevo (en caso de CREATE o UPDATE)

  @Column({ type: 'varchar' })
  userId: string; // ID del usuario que realizó la acción

  @CreateDateColumn()
  timestamp: Date; // Cuándo ocurrió la acción
}
```

### Paso 2: Generar la Tabla en la Base de Datos

Asegúrate de que la nueva entidad `CediRoleUserAuditEntity` se haya registrado en el archivo de configuración `app.module.ts` en la sección de entidades:

```typescript
TypeOrmModule.forFeature([CediRoleUserEntity, CediRoleUserAuditEntity])
```

Luego, ejecuta las migraciones o sincroniza el esquema de la base de datos para crear la nueva tabla de auditoría:

```bash
npm run typeorm migration:run
```

## 2. Implementar un Interceptor de Auditoría

### Paso 3: Crear un Interceptor de Auditoría

En NestJS, puedes utilizar un **Interceptor** para interceptar todas las operaciones relacionadas con la entidad `CediRoleUserEntity` y registrar las acciones en la tabla de auditoría.

Crea un archivo llamado `audit.interceptor.ts` dentro de la carpeta `interceptors`:

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CediRoleUserAuditEntity } from '../entities/cedi-role-user-audit.entity';
import { CediRoleUserEntity } from '../entities/cedi-role-user.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(CediRoleUserAuditEntity)
    private auditRepository: Repository<CediRoleUserAuditEntity>,
    @InjectRepository(CediRoleUserEntity)
    private cediRoleUserRepository: Repository<CediRoleUserEntity>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtenemos el usuario del contexto (probablemente a través de JWT)

    return next.handle().pipe(
      tap(async (result) => {
        const { body, method, params } = request;

        if (method === 'POST') {
          await this.auditRepository.save({
            entityId: result.id,
            action: 'CREATE',
            newValue: result,
            userId: user.id,
          });
        }

        if (method === 'PUT' || method === 'PATCH') {
          const original = await this.cediRoleUserRepository.findOne(params.id);
          await this.auditRepository.save({
            entityId: params.id,
            action: 'UPDATE',
            oldValue: original,
            newValue: body,
            userId: user.id,
          });
        }

        if (method === 'DELETE') {
          const original = await this.cediRoleUserRepository.findOne(params.id);
          await this.auditRepository.save({
            entityId: params.id,
            action: 'DELETE',
            oldValue: original,
            userId: user.id,
          });
        }
      }),
    );
  }
}
```

### Paso 4: Registrar el Interceptor Globalmente

Para asegurarte de que el interceptor de auditoría capture todas las operaciones, regístralo como un interceptor global en tu `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './interceptors/audit.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
```

## 3. Realizar el Log de Auditoría en la Aplicación

### Paso 5: Asociar el Usuario que Realiza la Acción

Asegúrate de que tu aplicación esté utilizando JWT o algún sistema de autenticación que permita identificar al usuario que realiza cada acción. El `request.user` debe estar disponible en el contexto de la solicitud, lo cual es posible utilizando el módulo de autenticación de NestJS.

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

## 4. Monitorear y Mantener los Logs de Auditoría

### Paso 6: Configuración de Retención de Logs

Puedes implementar una estrategia de limpieza o archivado de logs antiguos para mantener un buen rendimiento en la base de datos. Esto puede hacerse periódicamente mediante un script programado que elimine registros antiguos o los mueva a un almacenamiento de largo plazo.

## 5. Ejemplos de Consultas de Auditoría

### Consulta de todos los eventos de auditoría:

```sql
SELECT * FROM cedi_role_user_audit;
```

### Filtrar por tipo de acción (por ejemplo, DELETE):

```sql
SELECT * FROM cedi_role_user_audit WHERE action = 'DELETE';
```

### Filtrar por un usuario específico:

```sql
SELECT * FROM cedi_role_user_audit WHERE userId = '12345';
```

### Filtrar por fecha:

```sql
SELECT * FROM cedi_role_user_audit WHERE timestamp >= '2024-01-01';
```

## Conclusión

Esta estrategia de auditoría te permite mantener un registro detallado de todas las operaciones importantes relacionadas con la entidad `CediRoleUserEntity`, incluyendo quién realizó la acción y cuándo ocurrió. Esto es fundamental para mantener la integridad de los datos, cumplir con normativas y ofrecer un historial completo para futuras referencias.
