import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Tribe } from '../../tribes/entities/tribe.entity';

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @OneToOne(() => Tribe)
  @JoinColumn()
  id_tribe: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'char', length: 1 })
  state: string;

  @Column({ type: 'timestamp' })
  create_time: number;

  @Column({ type: 'char', length: 1 })
  status: string;
}
