import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { RoleEntity } from '@/infrastructure/persistence';
import { RoleRepository } from '@/core/domain/ports/outbound';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters/role-repository.adapter';
import { seedRoles } from '../seeds/role.seed';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryAdapter,
    },
  ],
})
export class DatabaseInitModule implements OnModuleInit {
  constructor(
    @Inject('RoleRepository') private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    await seedRoles(this.roleRepository);
  }
}
