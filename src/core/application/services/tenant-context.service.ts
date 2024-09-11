import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TenantContextService {
  private readonly asyncStorage = new AsyncLocalStorage<Map<string, string>>();

  // Inicia el contexto para la request actual con el esquema del tenant
  run(schema: string, callback: () => void): void {
    const store = new Map<string, string>();
    store.set('schema', schema);  // Guardamos el esquema en el contexto
    this.asyncStorage.run(store, callback);
  }

  // Obtener el esquema del tenant almacenado en el contexto
  getTenantSchema(): string | undefined {
    const store = this.asyncStorage.getStore();
    return store?.get('schema');
  }
}
