import { Payment } from 'src/payment/entities/payment.entity';
import { Customer } from 'src/user/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  package_number: number;

  @Column({ type: 'float64' })
  weight: number;

  @Column({ type: 'float64' })
  length: number;

  @Column({ type: 'float64' })
  width: number;

  @Column({ type: 'float64' })
  height: number;

  @Column({ type: 'float64', nullable: true })
  delay_fine: number;

  @Column({ type: 'float64', nullable: true })
  insurance_amount: number;

  @Column({ type: 'datetime', nullable: true })
  delivery_date: string;

  @Column({ type: 'datetime', nullable: true })
  entry_date: string;

  @Column({ type: 'smallint', nullable: false })
  status: string; // convert to an enum type0

  @Column({ type: 'smallint', nullable: false })
  category: string; // convert to an enum type

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  recipient: Customer;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  sender: Customer;

  @ManyToOne(() => Location, (lctn) => lctn.packages, {
    nullable: false,
    eager: true,
  })
  location: Location;

  @ManyToMany(() => Location, { nullable: false })
  @JoinTable({ name: 'package_locations' })
  package_locations: Location[];

  @ManyToOne(() => Payment, (payment) => payment.packages, { nullable: false })
  payment: Payment;
}
