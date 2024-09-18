import { Module, OnModuleInit, Logger, forwardRef } from '@nestjs/common';

import { IRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { seedRoles } from '@/infrastructure/seeds/tenant';
import { RoleModule } from '.';

@Module({
  imports: [
    forwardRef(() => RoleModule), // Use forwardRef to avoid circular dependency
  ],
  providers: [], // No need to redefine RoleRepository since it's already in RoleModule
})
export class DatabaseSeederModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederModule.name);

  constructor(
    private readonly roleRepository: IRoleRepositoryPort, // Inject the role repository
  ) {}

  async onModuleInit() {
    this.logger.log('Seeding roles...');
    await seedRoles(this.roleRepository);
    this.logger.log('Roles seeded successfully');
  }
}
