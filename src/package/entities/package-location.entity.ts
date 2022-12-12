import { Address } from 'src/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageLocationType } from '../enums/package-location.enum';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class PackageLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  timestamp: string;

  @Column({ type: 'smallint' })
  type: PackageLocationType;
  // one location has one address only
  @ManyToOne(() => Address, { nullable: false, cascade: true, eager: true })
  @JoinColumn()
  address: Address;
  // many packages can be at the same location together, and one package will go through multiple locations

  @ManyToMany(() => Package, (pkg) => pkg.package_locations, {
    lazy: true,
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  packages: Promise<Package[]>;
}
