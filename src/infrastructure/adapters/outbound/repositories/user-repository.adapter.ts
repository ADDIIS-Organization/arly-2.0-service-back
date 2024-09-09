import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepositoryPort } from '@/core/domain/ports/outbound';
import { UserEntity } from '@/infrastructure/persistence';
import { User } from '@/core/domain/entities';

@Injectable()
export class UserRepositoryAdapter implements IUserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  // Guardar usuario en la base de datos
  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(this.toEntity(user));
    return this.toDomain(savedUser);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map((user) => this.toDomain(user));
  }

  // Buscar usuario por ID
  async findById(id: number): Promise<User> {
    const userEntity = await this.repository.findOne({ where: { id } });
    if (!userEntity) {
      return null;
    }
    return this.toDomain(userEntity);
  }

  // Actualizar usuario
  async update(id: number, user: User): Promise<User> {
    await this.repository.update(id, this.toEntity(user));
    return this.findById(id);
  }

  // Eliminar usuario por ID
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Buscar usuario por username
  async findByUserName(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { username } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  // Convertir de entidad de dominio a entidad de persistencia
  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id ?? undefined; // Undefined permite que TypeORM genere el ID automáticamente
    entity.name = user.name;
    entity.email = user.email;
    entity.username = user.username;
    entity.password = user.password;
    // Relaciones como cediUserRoleEntities se gestionan automáticamente
    return entity;
  }

  // Convertir de entidad de persistencia a entidad de dominio
  private toDomain(entity: UserEntity): User {
    const { id, name, email, username, password } = entity;
    const user = new User(id, name, email, username, password);
    return user;
  }
}
