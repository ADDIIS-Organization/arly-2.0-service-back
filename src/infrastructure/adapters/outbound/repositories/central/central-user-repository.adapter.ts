import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CentralUserEntity } from '@/infrastructure/persistence/central/central-user.entity';
import { CreateUserDto } from '@/infrastructure/dtos/tenant/user/create-user.dto';
import { User } from '@/core/domain/entities/user.entity';
import { ICentralUserRepositoryPort } from '@/core/domain/ports/outbound/central/central-user-repository.port';

@Injectable()
export class CentralUserRepositoryAdapter
  implements ICentralUserRepositoryPort
{
  constructor(
    @InjectRepository(CentralUserEntity) // Asegúrate de agregar @InjectRepository
    private readonly centralUserRepository: Repository<CentralUserEntity>,
  ) {}

  // Guardar usuario en la base de datos central
  async createCentralUser(userDto: CreateUserDto): Promise<User> {
    const centralUser = this.centralUserRepository.create(userDto);
    const savedUser = await this.centralUserRepository.save(centralUser);
    return this.toDomain(savedUser);
  }

  // Nuevo método para encontrar usuario por email incluyendo los tenants
  async findByEmailWithTenants(email: string): Promise<CentralUserEntity> {
    const user = await this.centralUserRepository.findOne({
      where: { email },
      relations: ['tenants'],
    });
    return user;
  }

  // Convertir de entidad de persistencia a entidad de dominio
  private toDomain(entity: CentralUserEntity): User {
    const { id, name, email, username, password } = entity;
    return new User(id, name, email, username, password);
  }
}
