import { Arly1DetalleturnoRepositoryAdapter } from './../../adapters/outbound/repositories/tenant/arly-1-detalleturno-repository.adapter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  Arly1SedeEntity,
  DetalleTurnoEntity,
  EmpleadoEntity,
  MuelleColaboradorTurnoEntity,
  MuelleTurnoEntity,
} from '@/infrastructure/persistence/tenant/arly1';
import {
  Arly1DetalleturnoApplicationService,
  Arly1MuelleturnoApplicationService,
} from '@/core/application/services/tenant';
import { Arly1MuelleturnoController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/arly-1-muelleturno.controller';
import { Arly1MuelleturnoRepositoryAdapter } from '@/infrastructure/adapters/outbound/repositories/tenant/arly-1-muelleturno-repository.adapter';
import { Arly1DetalleturnoController } from '@/infrastructure/adapters/inbound/http/controllers/tenant/arly-1-detalleturno.controller';

import { MuelleTurnoMapper } from '@/infrastructure/utils/mappers/muelleturno.mapper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hacer que ConfigModule sea global
    }),

    // Configuración del DataSource para ARLY1 usando TypeOrmModule.forRootAsync
    TypeOrmModule.forRootAsync({
      name: 'ARLY1_DATA_SOURCE', // Nombre del DataSource secundario
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_SECUNDARY_HOST'),
        port: configService.get<number>('DATABASE_SECUNDARY_PORT'),
        username: configService.get<string>('DATABASE_SECUNDARY_USERNAME'),
        password: configService.get<string>('DATABASE_SECUNDARY_PASSWORD'),
        database: configService.get<string>('DATABASE_SECUNDARY_NAME'),
        entities: [
          MuelleTurnoEntity,
          DetalleTurnoEntity,
          Arly1SedeEntity,
          EmpleadoEntity,
          MuelleColaboradorTurnoEntity,
        ], // Asegúrate de que tus entidades estén bien registradas
        synchronize: false,
      }),
    }),

    // Registrar la entidad para el DataSource específico
    TypeOrmModule.forFeature(
      [
        MuelleTurnoEntity,
        DetalleTurnoEntity,
        Arly1SedeEntity,
        EmpleadoEntity,
        MuelleColaboradorTurnoEntity,
      ],
      'ARLY1_DATA_SOURCE',
    ),
  ],
  controllers: [Arly1MuelleturnoController, Arly1DetalleturnoController],

  providers: [
    {
      provide: 'IArly1MuelleturnoRepositoryPort',
      useClass: Arly1MuelleturnoRepositoryAdapter,
    },
    {
      provide: 'IArly1DetalleturnoRepositoryPort',
      useClass: Arly1DetalleturnoRepositoryAdapter,
    },
    Arly1DetalleturnoApplicationService,
    Arly1MuelleturnoApplicationService,
    MuelleTurnoMapper,
  ],
  exports: [
    'IArly1MuelleturnoRepositoryPort',
    Arly1MuelleturnoApplicationService,
    'IArly1DetalleturnoRepositoryPort',
    Arly1DetalleturnoApplicationService,
    MuelleTurnoMapper,
  ],
})
export class Arly1Module {}
