import * as path from 'path';
import * as fs from 'fs';

import { DataSource, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ModuleEntity } from '@/infrastructure/persistence/tenant/module.entity';
import { IModuleSeed } from './interfaces/module-seed.interface';


export async function seedModules(dataSource: DataSource): Promise<void> {
  const logger = new Logger('SeedModules');
  const moduleRepository: Repository<ModuleEntity> =
    dataSource.getRepository(ModuleEntity);

  try {
    // Lee el archivo JSON de semillas de módulos
    const seedFilePath = path.join(__dirname, './data/module-seeds.json');
    const moduleSeeds: IModuleSeed[] = JSON.parse(
      fs.readFileSync(seedFilePath, 'utf8'),
    );

    // Itera sobre las semillas de módulos
    for (const moduleSeed of moduleSeeds) {
      // Verifica si el módulo ya existe
      const existingModule = await moduleRepository.findOne({
        where: { name: moduleSeed.name },
      });

      if (!existingModule) {
        // Si no existe, crea un nuevo módulo
        const newModule = moduleRepository.create({
          name: moduleSeed.name,
          icon: moduleSeed.icon,
        });

        await moduleRepository.save(newModule);
        logger.log(`Módulo creado: ${newModule.name}`);
      } else {
        logger.log(`Módulo ya existe: ${moduleSeed.name}`);
      }
    }

    logger.log('Seeding de módulos completado');
  } catch (error) {
    logger.error(`Error durante el seeding de módulos: ${error.message}`);
    throw error;
  }
}
