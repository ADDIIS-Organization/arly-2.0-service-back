import { Module, OnModuleInit, Logger, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from '@/core/domain/ports/outbound';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters';
import { seedRoles } from '@/infrastructure/seeds/role.seed';
import { RoleEntity } from '@/infrastructure/persistence';
import { RoleModule } from './';

@Module({
  imports: [
    forwardRef(() => RoleModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [], // No need to redefine RoleRepository since it's already in RoleModule
})
export class DatabaseSeederModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederModule.name);

  constructor(
    private readonly roleRepository: RoleRepository, // Inject the role repository
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding roles...');
    await seedRoles(this.roleRepository);
    this.logger.log('Roles seeded successfully');
  }
}
