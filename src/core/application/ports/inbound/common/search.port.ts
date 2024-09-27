export interface SearchPort {
  searchByField<T>(
    entity: new () => T,
    searchField: keyof T,
    searchValue: string,
  ): Promise<T[]>;
}
