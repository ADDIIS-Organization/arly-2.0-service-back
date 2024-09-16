import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { TenantEntity } from '../';

@Entity('central_users')  // Esta tabla pertenece al esquema central
export class CentralUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // Relación muchos-a-muchos con inquilinos
  @ManyToMany(() => TenantEntity, (tenant) => tenant.users)
  tenants: TenantEntity[];
}
