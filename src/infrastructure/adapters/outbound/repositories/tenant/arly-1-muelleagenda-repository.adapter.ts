import { MuelleAgenda } from '@/core/domain/entities/arly-1-muelle-agenda.entity';
import { IArly1MuelleAgendaRepositoryPort } from '@/core/domain/ports/outbound/arly-1-muelleagenda-repository.port';
import { MuelleAgendaEntity } from '@/infrastructure/persistence/tenant/arly1/arly1-muelleagenda.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class Arly1MuelleAgendaRepositoryAdapter
  implements IArly1MuelleAgendaRepositoryPort
{
  constructor(
    @InjectRepository(MuelleAgendaEntity, 'ARLY1_DATA_SOURCE') // Inyectamos el repositorio del DataSource secundario
    private readonly repository: Repository<MuelleAgendaEntity>,
  ) {}

  async findByCediId(cediId: string): Promise<MuelleAgenda[]> {
    // Obtén la fecha de hoy sin la parte de la hora
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora al inicio del día (00:00:00)
  
    // Obtén la fecha de mañana para el rango de comparación
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Mueve la fecha a mañana a las 00:00:00

    //Test with yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Mueve la fecha a ayer a las 00:00:00
  
    // Consulta el datasource arly para muelleagenda donde idsede = cediId y fechaapertura es hoy, con un límite de 10, y ordenado de manera descendente
    const muelleAgendas = await this.repository.find({
      where: {
        idsede: +cediId,
        // fechaapertura: Between(today, tomorrow), // Rango para obtener los registros del día actual
        fechaapertura: Between(yesterday, today), // Rango para obtener los registros del día actual
      },
      order: {
        fechaapertura: 'DESC', // Ordenar por `fechaapertura` en orden descendente
      },
      take: 10, // Limitar los resultados a 10
    });

    console.log('muelleAgendas xd', muelleAgendas);
    return muelleAgendas;
  }
}
