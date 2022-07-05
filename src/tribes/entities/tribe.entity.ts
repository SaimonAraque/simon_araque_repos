import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Organization } from '../../organizations/entities/organization.entity';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @OneToOne(() => Organization)
  @JoinColumn()
  id_organization: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  status: number;
}
