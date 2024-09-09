import * as fs from 'fs';
import * as path from 'path';

import { IRoleRepositoryPort } from '@/core/domain/ports/outbound';
import { Role } from '@/core/domain/entities';
import { IRoleSeed } from './interfaces';
import { Logger } from '@nestjs/common';


export async function seedRoles(roleRepository: IRoleRepositoryPort) {
  const logger = new Logger('SeedRoles');

  // Load role seeds from external JSON file
  const seedFilePath = path.join(__dirname, './data/role-seeds.json');
  const roleSeeds: IRoleSeed[] = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));

  // Iterate over the loaded seeds and insert if not already present
  for (const roleSeed of roleSeeds) {
    const existingRole = await roleRepository.findByName(roleSeed.name);
    if (!existingRole) {
      const newRole = Role.create(roleSeed.name, roleSeed.description);  // Create Role domain object
      await roleRepository.save(newRole);
      logger.log(`Role ${roleSeed.name} created.`);
    } else {
      logger.log(`Role ${roleSeed.name} already exists.`);
    }
  }
}