import { DataSource } from 'typeorm';
import {
  Arly1SedeEntity,
  DetalleTurnoEntity,
  EmpleadoEntity,
  MuelleColaboradorTurnoEntity,
  MuelleTurnoEntity,
} from '../persistence/tenant/arly1';
import { ConfigService } from '@nestjs/config';

export const createArl1DataSource = (configService: ConfigService) => {
  return ({
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
    ],
    synchronize: false,
  });
};
