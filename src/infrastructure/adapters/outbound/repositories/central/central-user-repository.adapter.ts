import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserDto } from '@/infrastructure/dtos/tenant/user';
import { CentralUserEntity } from '@/infrastructure/persistence';
import { User } from '@/core/domain/entities';

@Injectable()
export class CentralUserRepositoryAdapter {
  constructor(
    @InjectRepository(CentralUserEntity)
    private readonly centralUserRepository: Repository<CentralUserEntity>,
  ) {}

  // Guardar usuario en la base de datos central
  async createCentralUser(userDto: CreateUserDto): Promise<User> {
    const centralUser = this.centralUserRepository.create(userDto);
    const savedUser = await this.centralUserRepository.save(centralUser);
    return this.toDomain(savedUser);
  }

  // Convertir de entidad de persistencia a entidad de dominio
  private toDomain(entity: CentralUserEntity): User {
    const { id, name, email, username, password } = entity;
    return new User(id, name, email, username, password);  // Crear la entidad de dominio
  }
}
