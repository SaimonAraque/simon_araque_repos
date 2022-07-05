import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Tribe } from '../../tribes/entities/tribe.entity';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'char', length: 1 })
  state: string;

  @Column({ type: 'timestamp' })
  create_time: number;

  @Column({ type: 'char', length: 1 })
  status: string;

  @ManyToOne(() => Tribe, (tribe) => tribe.repositories)
  @JoinColumn({ name: 'id_tribe' })
  tribe: Tribe;
}
