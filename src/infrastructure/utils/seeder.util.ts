import { DatabaseSeederModule } from '../modules';

export function getSeederModules() {
  return process.env.NODE_ENV !== 'production' ? [DatabaseSeederModule] : [];
}
