import { Address } from 'src/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './package.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, type: 'text' })
  country: string;

  @Column({ type: 'datetime' })
  timestamp: string;

  @Column({ type: 'smallint' })
  type: number; // TODO: replace with an enum

  @OneToOne(() => Address, { nullable: false })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Package, (pkg) => pkg.location, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  packages: Promise<Package[]>;
}
