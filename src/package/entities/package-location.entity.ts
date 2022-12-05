import { Address } from 'src/address/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class PackageLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, type: 'text' })
  country: string;

  @Column({ type: 'datetime' })
  timestamp: string;

  @Column({ type: 'smallint' })
  type: PackageLocation;
  // one location has one address only
  @OneToOne(() => Address, { nullable: false })
  @JoinColumn()
  address: Address;
  // many packages can be at the same location together, and one package will go through multiple locations
  @ManyToOne(() => Package, (pkg) => pkg.current_location, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  packages: Promise<Package[]>;

  @ManyToOne(() => TransportEvent, (event) => event.delivery_route, {
    eager: true,
  })
  transport_event: TransportEvent;
}
