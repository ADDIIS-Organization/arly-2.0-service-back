import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CediUserRoleRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CediUserRoleEntity } from '../persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([CediUserRoleEntity]), // Importar la entidad
  ],
  providers: [
    {
      provide: 'ICediUserRoleRepositoryPort',  // El puerto para el repositorio
      useClass: CediUserRoleRepositoryAdapter, // Adaptador del repositorio
    },
  ],
  exports: ['ICediUserRoleRepositoryPort'], // Exportar si es necesario
})
export class CediUserRoleModule {}
