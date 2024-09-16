import { DatabaseSeederModule } from '../modules/tenant';

export function getSeederModules() {
  return process.env.NODE_ENV !== 'production' ? [DatabaseSeederModule] : [];
}
