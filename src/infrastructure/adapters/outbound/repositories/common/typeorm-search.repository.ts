import { Injectable } from '@nestjs/common';
import { Like, EntityManager } from 'typeorm';

import { SearchPort } from '@/core/application/ports/inbound';

@Injectable()
export class TypeOrmSearchRepository implements SearchPort {
  constructor(
    private readonly entityManager: EntityManager, // Usamos EntityManager para manejar repositorios dinámicamente
  ) {}

  async searchByField<T>(
    entity: new () => T,
    searchField: keyof T,
    searchValue: string,
  ): Promise<T[]> {
    // Obtener dinámicamente el repositorio según la entidad
    const repo = this.entityManager.getRepository(entity);

    return repo.find({
      where: {
        [searchField]: Like(`%${searchValue}%`),
      } as any, // Forzamos el tipo para evitar errores
    });
  }
}
