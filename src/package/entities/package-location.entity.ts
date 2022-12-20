<<<<<<< HEAD
import { GeoAddress } from 'src/package/entities/address.entity';
=======
import { Address } from 'src/address/entities/address.entity';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import {
  Column,
  Entity,
  JoinColumn,
<<<<<<< HEAD
  ManyToMany,
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
<<<<<<< HEAD
import { PackageLocationType } from '../enums/package-location.enum';
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class PackageLocation {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Column({ type: 'datetime', nullable: true })
  timestamp: string;

  @Column({ type: 'smallint' })
  type: PackageLocationType;
  // one location has one address only
  @ManyToOne(() => GeoAddress, {
    nullable: false,
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: GeoAddress;
  // many packages can be at the same location together, and one package will go through multiple locations

  @ManyToMany(() => Package, (pkg) => pkg.package_locations, {
    lazy: true,
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  packages: Promise<Package[]>;
=======
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
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
