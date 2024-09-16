import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TenantRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CentralUserEntity, UserEntity } from '@/infrastructure/persistence';
import { TenantContextService } from '@/core/application/services/tenant';
import { IUserRepositoryPort } from '@/core/domain/ports/outbound';
import { User } from '@/core/domain/entities';

@Injectable()
export class UserRepositoryAdapter implements IUserRepositoryPort {
  constructor(
    private readonly tenantRepository: TenantRepositoryAdapter,  // Inyectamos TenantRepositoryAdapter
    private readonly tenantContextService: TenantContextService,  // Inyectamos el contexto del tenant
  ) {}

  // Obtener el repositorio dinámico de usuarios basado en el esquema del tenant
  private async getRepository(): Promise<Repository<CentralUserEntity>> {
    const schema = this.tenantContextService.getTenantSchema();  // Obtenemos el schema desde el contexto
    if (!schema) {
      throw new Error('Esquema del tenant no definido');
    }

    const dataSource = this.tenantRepository.getConnection(schema);  // Obtenemos el DataSource dinámico
    return dataSource.getRepository(CentralUserEntity);  // Obtenemos el repositorio dinámico
  }

  // Guardar usuario en la base de datos
  async save(user: User): Promise<User> {
    const repository = await this.getRepository();
    const savedUser = await repository.save(this.toEntity(user));
    return this.toDomain(savedUser);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    const repository = await this.getRepository();
    const users = await repository.find();
    return users.map((user) => this.toDomain(user));
  }

  // Buscar usuario por ID
  async findById(id: number): Promise<User | null> {
    const repository = await this.getRepository();
    const centralUserEntity = await repository.findOne({ where: { id } });
    if (!centralUserEntity) {
      return null;
    }
    return this.toDomain(centralUserEntity);
  }

  // Actualizar usuario
  async update(id: number, user: User): Promise<User> {
    const repository = await this.getRepository();
    await repository.update(id, this.toEntity(user));
    return this.findById(id);
  }

  // Eliminar usuario por ID
  async delete(id: number): Promise<void> {
    const repository = await this.getRepository();
    await repository.delete(id);
  }

  // Buscar usuario por username
  async findByUserName(username: string): Promise<User | null> {
    const repository = await this.getRepository();
    const userEntity = await repository.findOne({ where: { username } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  // Convertir de entidad de dominio a entidad de persistencia
  private toEntity(user: User): CentralUserEntity {
    const entity = new CentralUserEntity();
    entity.id = user.id ?? undefined;  // Undefined permite que TypeORM genere el ID automáticamente
    return entity;
  }

  // Convertir de entidad de persistencia a entidad de dominio
  private toDomain(entity: CentralUserEntity): User {
    const { id, name, email, username, password } = entity;
    return new User(id, name, email, username, password);  // Crear la entidad de dominio
  }
}
