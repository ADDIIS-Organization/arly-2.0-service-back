import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('central_roles')  // Roles específicos del esquema central
export class CentralRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
