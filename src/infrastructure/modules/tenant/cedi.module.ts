import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CediEntity } from '@/infrastructure/persistence/tenant/cedi.entity';
import { CediController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/cedi.controller';
import { CediApplicationService } from '@/core/application/services/tenant/cedi-application.service';
import { CediDomainService } from '@/core/domain/services/cedi-domain.service';
import { CediRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/cedi-repository.adapter';
import { SearchService } from '@/core/application/services/common/search.service';
import { TypeOrmSearchRepository } from '@/infrastructure/adapters/outbound/repositories/common/typeorm-search.repository';


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
