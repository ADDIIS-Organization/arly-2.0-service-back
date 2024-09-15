import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CediRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories';
import { CediController } from '@/infrastructure/adapters/inbound/controllers';
import { CediApplicationService } from '@/core/application/services';
import { CediDomainService } from '@/core/domain/services';
import { CediEntity } from '@/infrastructure/persistence';
import { SearchService } from '@/core/application/services/common/search.service';
import { TypeOrmSearchRepository } from '../adapters/outbound/repositories/common/typeorm-search.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CediEntity]), // Importa la entidad del Cedi para el repositorio
  ],
  controllers: [CediController], // Controladores del módulo
  providers: [
    CediApplicationService, // Servicio de aplicación de Cedis
    CediDomainService, // Servicio de dominio de Cedis
    {
      provide: 'ICediRepositoryPort', // Puerto del repositorio de Cedis
      useClass: CediRepositoryAdapter, // Implementación del adaptador de repositorio
    },
    SearchService, // Registramos el servicio de búsqueda
    { provide: 'SearchRepository', useClass: TypeOrmSearchRepository }, // Inyectamos el repositorio de búsqueda
  ],
  exports: ['ICediRepositoryPort', CediApplicationService], // Exporta si es necesario en otros módulos
})
export class CediModule {}
