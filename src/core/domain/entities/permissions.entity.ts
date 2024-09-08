import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role, MenuItem } from './';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => MenuItem)
  menuItem: MenuItem;

  @Column({ default: false })
  can_get: boolean;

  @Column({ default: false })
  can_create: boolean;

  @Column({ default: false })
  can_update: boolean;

  @Column({ default: false })
  can_delete: boolean;
}
