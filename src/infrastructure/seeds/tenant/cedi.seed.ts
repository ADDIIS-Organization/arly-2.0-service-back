import * as fs from 'fs';
import * as path from 'path';

import { ICediRepositoryPort } from '@/core/domain/ports/outbound';
import { Cedi } from '@/core/domain/entities';
import { ICediSeed } from './interfaces';
import { Logger } from '@nestjs/common';

export async function seedCedis(cediRepository: ICediRepositoryPort) {
  const logger = new Logger('SeedCedis');

  // Load CEDI seeds from external JSON file
  const seedFilePath = path.join(__dirname, './data/cedi-seeds.json');
  const cediSeeds: ICediSeed[] = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));

  // Iterate over the loaded seeds and insert if not already present
  for (const cediSeed of cediSeeds) {
    const existingCedi = await cediRepository.findByName(cediSeed.name);
    if (!existingCedi) {
      try {
        const newCedi = Cedi.create(
          cediSeed.name,
          cediSeed.department,
          cediSeed.municipality,
          cediSeed.address,
          cediSeed.phone,
          cediSeed.primaryEmail,
          cediSeed.secondaryEmail,
          cediSeed.supervisor,
          cediSeed.company
        );
        await cediRepository.save(newCedi);
        logger.log(`CEDI ${cediSeed.name} created.`);
      } catch (error) {
        logger.error(`Error creating CEDI ${cediSeed.name}: ${error.message}`);
      }
    } else {
      logger.log(`CEDI ${cediSeed.name} already exists.`);
    }
  }
}   