import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserApplicationService } from '@/core/application/services';
import { UserController } from '../adapters/inbound/controllers';
import { CediUserRoleDomainService, UserDomainService } from '@/core/domain/services';
import { UserEntity } from '../persistence';
import { DatabaseSeederModule } from './';
import { UserRepositoryAdapter } from '../adapters/outbound/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Importar la entidad UserEntity
    // forwardRef(() => DatabaseSeederModule), // Usar si el módulo DatabaseSeeder es necesario aquí
  ],
  controllers: [UserController],  // Controladores que serán manejados por este módulo
  providers: [
    UserApplicationService,  // Registrar UserApplicationService como proveedor directamente
    UserDomainService,       // Registrar UserDomainService
    CediUserRoleDomainService,
    {
      provide: 'IUserRepositoryPort',  // Token para el puerto del repositorio
      useClass: UserRepositoryAdapter, // Implementación del adaptador del repositorio
    },
    {
      provide: 'ICediUserRoleRepositoryPort',  // Token para el puerto de la relación
      useClass: UserRepositoryAdapter, // Implementación del adaptador de la relación
    },
    {
      provide: 'ICediRepositoryPort',  // Token para el puerto del Cedi
      useClass: UserRepositoryAdapter, // Implementación del adaptador del Cedi
    },
    {
      provide: 'IRoleRepositoryPort',  // Token para el puerto del rol
      useClass: UserRepositoryAdapter, // Implementación del adaptador del rol
    }
  ],
  exports: ['IUserRepositoryPort', UserApplicationService], // Exportar si se necesita en otros módulos
})
export class UserModule {}
