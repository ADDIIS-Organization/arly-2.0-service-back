import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { CentralRoleEntity } from './central-role.entity';

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

  @ManyToMany(() => TenantEntity, (tenant) => tenant.users)
  @JoinTable({
    name: 'tenant_user',  // Tabla de relación muchos a muchos
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tenant_id', referencedColumnName: 'id' },
  })
  tenants: TenantEntity[];

  @ManyToMany(() => CentralRoleEntity, (role) => role.users)
  @JoinTable({
    name: 'central_role_user',  // Tabla de relación muchos a muchos
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: CentralRoleEntity[];
}
