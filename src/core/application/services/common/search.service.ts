import { Inject, Injectable } from '@nestjs/common';
import { SearchPort } from '@/core/application/ports/inbound/common';


@Injectable()
export class SearchService {
  constructor(
    @Inject('SearchRepository') private readonly searchRepository: SearchPort,
  ) {}

  async search<T>(
    entity: new () => T,
    searchField: string,
    searchValue: string,
  ): Promise<T[]> {
    // Se asegura de buscar en cualquier campo de la entidad
    return this.searchRepository.searchByField(
      entity,
      searchField as keyof T,
      searchValue,
    );
  }
}
