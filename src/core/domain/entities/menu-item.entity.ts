import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;  // e.g., 'Gestión de usuarios', 'Gestión de CEDIs'
}
