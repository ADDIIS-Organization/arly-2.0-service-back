import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { CentralUserEntity } from '..';

@Entity('tenants')  // Esta tabla pertenece al esquema central
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;  // Nombre del tenant i.e. 'country_code_guuid'

  @ManyToMany(() => CentralUserEntity, (user) => user.tenants)
  @JoinTable({
    name: 'tenant_user',  // Tabla de relación muchos a muchos en el esquema central
    joinColumn: { name: 'tenant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: CentralUserEntity[];
}
