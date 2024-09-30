import { Injectable } from '@nestjs/common';
import { Cedi } from '../entities/cedi.entity';

/**
 * Represents a service for managing Cedis in the domain layer.
 *
 * This service is responsible for the business logic related to Cedi entities.
 * In the case of `createCedi`, it handles the creation of new Cedi entities,
 * applying any domain-specific business rules.
 */
@Injectable()
export class CediDomainService {
  /**
   * Creates a new Cedi entity.
   *
   * @param name - The name of the Cedi.
   * @param department - The department of the Cedi.
   * @param municipality - The municipality of the Cedi.
   * @param address - The address of the Cedi.
   * @param phone - The phone number of the Cedi.
   * @param primaryEmail - The primary email address of the Cedi.
   * @param secondaryEmail - The secondary email address of the Cedi.
   * @param supervisor - The supervisor of the Cedi.
   * @param company - The company to which the Cedi belongs.
   * @returns The newly created Cedi entity.
   */
  createCedi(
    name: string,
    department: string,
    municipality: string,
    address: string,
    phone: string,
    primaryEmail: string,
    secondaryEmail: string,
    supervisor: string,
    company: string,
  ): Cedi {
    // Aquí puede ir lógica adicional, como validaciones de negocio o reglas
    return Cedi.create(
      name,
      department,
      municipality,
      address,
      phone,
      primaryEmail,
      secondaryEmail,
      supervisor,
      company,
    );
  }

  /**
   * Updates an existing Cedi entity.
   *
   * @param cedi - The Cedi entity to update.
   * @param name - The new name of the Cedi.
   * @param department - The new department of the Cedi.
   * @param municipality - The new municipality of the Cedi.
   * @param address - The new address of the Cedi.
   * @param phone - The new phone number of the Cedi.
   * @param supervisor - The new supervisor of the Cedi.
   * @param company - The new company of the Cedi.
   * @returns The updated Cedi entity.
   */
  updateCedi(
    cedi: Cedi,
    name?: string,
    department?: string,
    municipality?: string,
    address?: string,
    phone?: string,
    supervisor?: string,
    company?: string,
  ): Cedi {
    // Aquí podría haber validaciones adicionales antes de actualizar
    cedi.updateInfo(
      name,
      department,
      municipality,
      address,
      phone,
      supervisor,
      company,
    );
    return cedi;
  }

  // Additional domain-specific logic can be added here for further business rules or validations
}
