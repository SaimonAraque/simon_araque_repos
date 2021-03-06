import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Organization } from '../../organizations/entities/organization.entity';
import { Repository } from '../..//repositories/entities/repository.entity';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.tribes, {
    eager: true,
  })
  @JoinColumn({ name: 'id_organization' })
  organization: Organization;

  @OneToMany(() => Repository, (repository) => repository.tribe)
  repositories: Repository[];
}
