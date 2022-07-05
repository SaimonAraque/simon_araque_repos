import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Tribe } from '../../tribes/entities/tribe.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id_organization: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  status: number;

  @OneToMany(() => Tribe, (tribe) => tribe.organization)
  tribes: Tribe[];
}
