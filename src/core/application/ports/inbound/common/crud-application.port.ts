export interface IBaseApplicationPort<T, CreateDto, UpdateDto> {
  update(id: number, updateDto: UpdateDto): Promise<T>;
  save(createDto: CreateDto): Promise<T>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
}
