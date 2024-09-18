import * as fs from 'fs';
import * as path from 'path';
import { DataSource, Repository } from 'typeorm';
import { MenuItemEntity, ModuleEntity } from '@/infrastructure/persistence/tenant';
import { Logger } from '@nestjs/common';
import { IMenuItemSeed } from './interfaces/menu-item-seed.interface';

export async function seedMenuItems(dataSource: DataSource): Promise<void> {
  const logger = new Logger('SeedMenuItems');
  const menuItemRepository: Repository<MenuItemEntity> = dataSource.getRepository(MenuItemEntity);
  const moduleRepository: Repository<ModuleEntity> = dataSource.getRepository(ModuleEntity);

  try {
    // Lee el archivo JSON de semillas de ítems de menú
    const seedFilePath = path.join(__dirname, './data/menu-item-seeds.json');
    const menuItemSeeds: IMenuItemSeed[] = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));

    // Primer paso: Crear todos los ítems de menú sin establecer relaciones padre-hijo
    const menuItemMap = new Map<string, MenuItemEntity>();

    for (const seed of menuItemSeeds) {
      let menuItem = await menuItemRepository.findOne({ where: { name: seed.name, route: seed.route } });

      if (!menuItem) {
        const module = await moduleRepository.findOne({ where: { name: seed.moduleName } });
        if (!module) {
          logger.warn(`Módulo no encontrado para el ítem de menú: ${seed.name}`);
          continue;
        }

        menuItem = menuItemRepository.create({
          name: seed.name,
          route: seed.route,
          module: module
        });

        menuItem = await menuItemRepository.save(menuItem);
        logger.log(`Ítem de menú creado: ${menuItem.name}`);
      } else {
        logger.log(`Ítem de menú ya existe: ${seed.name}`);
      }

      menuItemMap.set(seed.name, menuItem);
    }

    // Segundo paso: Establecer relaciones padre-hijo
    for (const seed of menuItemSeeds) {
      if (seed.parentName) {
        const childItem = menuItemMap.get(seed.name);
        const parentItem = menuItemMap.get(seed.parentName);

        if (childItem && parentItem) {
          childItem.parent = parentItem;
          await menuItemRepository.save(childItem);
          logger.log(`Relación padre-hijo establecida: ${parentItem.name} -> ${childItem.name}`);
        } else {
          logger.warn(`No se pudo establecer la relación padre-hijo para: ${seed.name}`);
        }
      }
    }

    logger.log('Seeding de ítems de menú completado');
  } catch (error) {
    logger.error(`Error durante el seeding de ítems de menú: ${error.message}`);
    throw error;
  }
}