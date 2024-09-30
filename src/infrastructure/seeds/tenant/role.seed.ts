import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

import { RoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/role-repository.adapter';
import { RoleEntity } from '@/infrastructure/persistence/tenant/role.entity';
import { IRoleSeed } from './interfaces/role-seed.interface';
import { Role } from '@/core/domain/entities/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const logger = new Logger('SeedRoles');

  // Get the role repository
  const roleRepository = dataSource.getRepository(RoleEntity);
  const roleRepositoryAdapter = new RoleRepositoryAdapter(roleRepository);

  // Load role seeds from external JSON file
  const seedFilePath = path.join(__dirname, './data/role-seeds.json');
  const roleSeeds: IRoleSeed[] = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));

  // Iterate over the loaded seeds and insert if not already present
  for (const roleSeed of roleSeeds) {
    const existingRole = await roleRepositoryAdapter.findByName(roleSeed.name);
    if (!existingRole) {
      const newRole = Role.create(roleSeed.name, roleSeed.description);  // Create Role domain object
      await roleRepositoryAdapter.save(newRole);
      logger.log(`Role ${roleSeed.name} created.`);
    } else {
      logger.log(`Role ${roleSeed.name} already exists.`);
    }
  }
}