import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { IRoleSeed } from './interfaces';
import { Logger } from '@nestjs/common';
import { RoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { RoleEntity } from '@/infrastructure/persistence';
import { Role } from '@/core/domain/entities';

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