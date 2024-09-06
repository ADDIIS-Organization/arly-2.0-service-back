import { Role } from '@/core/domain/entities';

export const roleSeeds: Role[] = [
  Role.create('superAdmin', 'Super Administrator with full access'),
  Role.create('admin', 'Administrator with high-level access'),
  Role.create('supervisor', 'Supervisor with oversight capabilities'),
];

export async function seedRoles(roleRepository: any) {
  for (const roleSeed of roleSeeds) {
    const existingRole = await roleRepository.findByName(roleSeed.name);
    if (!existingRole) {
      await roleRepository.save(roleSeed);
      console.log(`Role ${roleSeed.name} created.`);
    } else {
      console.log(`Role ${roleSeed.name} already exists.`);
    }
  }
}
