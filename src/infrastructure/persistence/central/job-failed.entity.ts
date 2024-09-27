import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs_failed')  // Esta tabla pertenece al esquema central
export class JobFailed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_name: string;

  @Column()
  failed_at: Date;

  @Column()
  reason: string;
}
