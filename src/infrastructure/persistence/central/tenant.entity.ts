import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { CentralUserEntity } from '..';

@Entity('tenants')  // Esta tabla pertenece al esquema central
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Nombre del tenant

  @Column()
  schema: string;  // Esquema asociado al tenant

  @ManyToMany(() => CentralUserEntity, (user) => user.tenants)
  @JoinTable({
    name: 'tenant_user',  // Tabla de relación muchos a muchos en el esquema central
    joinColumn: { name: 'tenant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: CentralUserEntity[];
}
