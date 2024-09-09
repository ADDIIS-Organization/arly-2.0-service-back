import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepositoryAdapter } from '../adapters/outbound/repositories';
import { RoleEntity } from '@/infrastructure/persistence';
import { seedRoles } from '@/infrastructure/seeds';

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
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepositoryAdapter,
  ) {}

  async onModuleInit() {
    await seedRoles(this.roleRepository);
  }
}
