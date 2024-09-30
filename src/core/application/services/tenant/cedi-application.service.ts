import { Inject, Injectable } from '@nestjs/common';

import { ICediRepositoryPort } from '@/core/domain/ports/outbound/cedi-repository.port';
import { CediResponseDto } from '@/infrastructure/dtos/tenant/cedi/cedi-response.dto';
import { CreateCediDto } from '@/infrastructure/dtos/tenant/cedi/create-cedi.dto';
import { UpdateCediDto } from '@/infrastructure/dtos/tenant/cedi/update-cedi.dto';
import { ICediApplicationPort } from '../../ports/inbound/cedi-application.port';
import { CediDomainService } from '@/core/domain/services/cedi-domain.service';
import { CrudApplicationService } from '../common/crud-application.service';
import { Cedi } from '@/core/domain/entities/cedi.entity';


@Injectable()
export class CediApplicationService
  extends CrudApplicationService<Cedi, CreateCediDto, UpdateCediDto, CediResponseDto>
  implements ICediApplicationPort
{
  constructor(
    private readonly cediDomainService: CediDomainService,
    @Inject('ICediRepositoryPort')
    private readonly cediRepository: ICediRepositoryPort,
  ) {
    super(cediRepository);
  }

  // Método para convertir el DTO de creación en una entidad de dominio
  protected toEntity(createDto: CreateCediDto): Cedi {
    return this.cediDomainService.createCedi(
      createDto.name,
      createDto.department,
      createDto.municipality,
      createDto.address,
      createDto.phone,
      createDto.primaryEmail,
      createDto.secondaryEmail,
      createDto.supervisor,
      createDto.company,
    );
  }

  // Método para convertir el DTO de actualización en una entidad de dominio actualizada
  protected async toUpdatedEntity(id: number, updateDto: UpdateCediDto): Promise<Cedi> {
    const cedi = await this.cediRepository.findById(id);
    if (!cedi) {
      throw new Error('Cedi not found');
    }

    // Actualizamos el cedi con la información proporcionada
    cedi.updateInfo(
      updateDto.name,
      updateDto.department,
      updateDto.municipality,
      updateDto.address,
      updateDto.phone,
      updateDto.supervisor,
      updateDto.company,
    );

    return cedi;
  }

  // Método para retornar un Cedi como Response DTO
  protected toResponseDto(cedi: Cedi): CediResponseDto {
    return {
      id: cedi.id,
      name: cedi.name,
      department: cedi.department,
      municipality: cedi.municipality,
      address: cedi.address,
      phone: cedi.phone,
      primaryEmail: cedi.primaryEmail,
      secondaryEmail: cedi.secondaryEmail,
      supervisor: cedi.supervisor,
      company: cedi.company,
    };
  }

  // Método para manejar la creación de un nuevo Cedi
  async create(createCediDto: CreateCediDto): Promise<CediResponseDto> {
    const cedi = this.toEntity(createCediDto);
    const savedCedi = await this.cediRepository.save(cedi);
    return this.toResponseDto(savedCedi);
  }

  // Método para manejar la actualización de un Cedi
  async update(id: number, updateCediDto: UpdateCediDto): Promise<CediResponseDto> {
    const updatedCedi = await this.toUpdatedEntity(id, updateCediDto);
    const savedCedi = await this.cediRepository.update(id, updatedCedi);
    return this.toResponseDto(savedCedi);
  }
}
