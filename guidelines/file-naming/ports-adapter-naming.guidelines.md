## Convenciones de Nomenclatura para Puertos y Adaptadores en NestJS

En una aplicación NestJS que implementa arquitectura hexagonal, es importante seguir convenciones de nomenclatura claras para mantener la consistencia y legibilidad del código. Aquí te presento las convenciones comúnmente utilizadas para puertos y adaptadores:

### Puertos (Interfaces)

1. Nombres de archivo:
   - Formato: `<nombre-descriptivo>.port.ts`
   - Ejemplos:
     - `user-repository.port.ts`
     - `email-service.port.ts`

2. Nombres de interfaz:
   - Formato: `I<NombreDescriptivo>Port`
   - Ejemplos:
     - `IUserRepositoryPort`
     - `IEmailServicePort`

### Adaptadores

1. Nombres de archivo:
   - Formato: `<nombre-descriptivo>.adapter.ts`
   - Ejemplos:
     - `typeorm-user-repository.adapter.ts`
     - `sendgrid-email-service.adapter.ts`

2. Nombres de clase:
   - Formato: `<NombreDescriptivo>Adapter`
   - Ejemplos:
     - `TypeOrmUserRepositoryAdapter`
     - `SendGridEmailServiceAdapter`

### Ejemplos en contexto

```typescript
// user-repository.port.ts
export interface IUserRepositoryPort {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// typeorm-user-repository.adapter.ts
@Injectable()
export class TypeOrmUserRepositoryAdapter implements IUserRepositoryPort {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

  async findById(id: string): Promise<User> {
    // Implementación
  }

  async save(user: User): Promise<void> {
    // Implementación
  }
}
```

### Consideraciones adicionales

1. Ubicación de archivos:
   - Puertos: Generalmente en `src/core/domain/ports` o `src/core/application/ports`
   - Adaptadores: Usualmente en `src/infrastructure/adapters`

2. Inyección de dependencias:
   - Usa el decorador `@Injectable()` en los adaptadores para que NestJS pueda inyectarlos.

3. Módulos:
   - Crea un módulo para cada conjunto de adaptadores relacionados, por ejemplo, `RepositoryAdaptersModule`.

4. Binding:
   - En el módulo correspondiente, vincula el puerto con su adaptador:

     ```typescript
     @Module({
       providers: [
         {
           provide: IUserRepositoryPort,
           useClass: TypeOrmUserRepositoryAdapter
         }
       ],
       exports: [IUserRepositoryPort]
     })
     export class RepositoryAdaptersModule {}
     ```