import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class Cedi {
  @Expose()
  public readonly id: number | null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Expose()
  public department: string;

  @Expose()
  public municipality: string;

  @Expose()
  public address: string;

  @Expose()
  public phone: string;

  private readonly _primaryEmail: string;
  private readonly _secondaryEmail: string;

  @Expose()
  public supervisor: string;

  @Expose()
  public company: string;

  constructor(
    id: number | null,
    name: string,
    department: string,
    municipality: string,
    address: string,
    phone: string,
    primaryEmail: string,
    secondaryEmail: string,
    supervisor: string,
    company: string,
  ) {
    this.id = id; // El ID será generado por la base de datos, inicialmente es null
    this.name = name;
    this.department = department;
    this.municipality = municipality;
    this.address = address;
    this.phone = phone;

    // Validación de emails
    if (!Cedi.isValidEmail(primaryEmail)) throw new Error('Primary email is not valid');
    this._primaryEmail = primaryEmail;

    if (secondaryEmail && !Cedi.isValidEmail(secondaryEmail)) throw new Error('Secondary email is not valid');
    this._secondaryEmail = secondaryEmail;

    this.supervisor = supervisor;
    this.company = company;
  }

  @Expose()
  get primaryEmail(): string {
    return this._primaryEmail;
  }

  @Expose()
  get secondaryEmail(): string {
    return this._secondaryEmail;
  }

  // Método de fábrica para crear un Cedi sin un ID (se asignará después de la persistencia)
  static create(
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
    return new Cedi(null, name, department, municipality, address, phone, primaryEmail, secondaryEmail, supervisor, company);
  }

  // Método para actualizar la información del Cedi
  updateInfo(
    name?: string,
    department?: string,
    municipality?: string,
    address?: string,
    phone?: string,
    supervisor?: string,
    company?: string,
  ): void {
    if (name) this.name = name;
    if (department) this.department = department;
    if (municipality) this.municipality = municipality;
    if (address) this.address = address;
    if (phone) this.phone = phone;
    if (supervisor) this.supervisor = supervisor;
    if (company) this.company = company;
  }

  // Validación de emails
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
}
