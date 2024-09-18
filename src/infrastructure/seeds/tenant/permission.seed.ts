import { DataSource, Repository } from 'typeorm';
import {
  PermissionEntity,
  RoleEntity,
  MenuItemEntity,
} from '@/infrastructure/persistence/tenant';
import { Logger } from '@nestjs/common';

export async function seedPermissions(dataSource: DataSource): Promise<void> {
  const logger = new Logger('SeedPermissions');
  const permissionRepository: Repository<PermissionEntity> =
    dataSource.getRepository(PermissionEntity);
  const roleRepository: Repository<RoleEntity> =
    dataSource.getRepository(RoleEntity);
  const menuItemRepository: Repository<MenuItemEntity> =
    dataSource.getRepository(MenuItemEntity);

  try {
    // Buscar el rol de superAdmin
    const superAdminRole = await roleRepository.findOne({
      where: { name: 'superAdmin' },
    });
    if (!superAdminRole) {
      logger.error('Rol superAdmin no encontrado');
      return;
    }

    // Obtener todos los ítems de menú, esto para el caso del rol superAdmin
    const menuItems = await menuItemRepository.find();

    // Crear o actualizar permisos para cada ítem de menú
    for (const menuItem of menuItems) {
      let permission = await permissionRepository.findOne({
        where: {
          role: { id: superAdminRole.id },
          menuItem: { id: menuItem.id },
        },
      });

      if (!permission) {
        permission = permissionRepository.create({
          role: superAdminRole,
          menuItem: menuItem,
          canGet: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
        });
      } else {
        // Actualizar permisos existentes
        permission.canGet = true;
        permission.canCreate = true;
        permission.canUpdate = true;
        permission.canDelete = true;
      }

      await permissionRepository.save(permission);
      logger.log(
        `Permisos actualizados o creados para superAdmin en el menú: ${menuItem.name}`,
      );
    }

    logger.log('Seeding de permisos para superAdmin completado');
  } catch (error) {
    logger.error(`Error durante el seeding de permisos: ${error.message}`);
    throw error;
  }
}
