import { Payment } from 'src/payment/entities/payment.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { RetailEmployee } from 'src/user/entities/retail-employee.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageCategory } from '../enums/package-category.enum';
<<<<<<< HEAD
import { PackageStatus } from '../enums/package-status.enum';
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { DeliveryOrder } from './delivery_order.entity';
import { PackageLocation } from './package-location.entity';

@Entity()
@Check(
  `"weight" > 0 AND "length" > 0 AND "width" > 0 AND "height" > 0 AND insurance_amount >= 0 `,
)
@Check(`"recipient" <> "sender"`)
export class Package {
  @PrimaryGeneratedColumn()
  package_number: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  length: number;

  @Column({ type: 'float' })
  width: number;

  @Column({ type: 'float' })
  height: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  delay_fine: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  insurance_amount: number;

  @Column({ type: 'datetime', nullable: true })
  delivery_date: string;

  @Column({ type: 'datetime', nullable: true })
<<<<<<< HEAD
  expected_delivery_date: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  entry_timestamp: string;

  @Column({ type: 'text', nullable: false, default: PackageStatus.TRANSIT })
  status: PackageStatus; // convert to an enum type

  @Column({ type: 'text', nullable: false })
  category: PackageCategory; // convert to an enum type

  @UpdateDateColumn({ type: 'datetime' })
  lastUpdated: string;

  @ManyToOne(() => PackageLocation, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  current_location: PackageLocation;

  @ManyToMany(() => PackageLocation, (location) => location.packages, {
    nullable: false,
  })
  @JoinTable({ name: 'package_locations' })
  package_locations: PackageLocation[];

  @ManyToOne(() => DeliveryOrder, (order) => order.packages, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  delivery_order: DeliveryOrder;
=======
  entry_timestamp: string;

  @Column({ type: 'smallint', nullable: false })
  status: string; // convert to an enum type

  @Column({ type: 'smallint', nullable: false })
  category: PackageCategory; // convert to an enum type

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customerId' })
  recipient: Customer;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customerId' })
  sender: Customer;
  //? registered by:
  @ManyToOne(() => RetailEmployee, (emp) => emp.packages, { eager: true })
  retail_employee: RetailEmployee;

  @ManyToOne(() => PackageLocation, (lctn) => lctn.packages, {
    nullable: false,
    eager: true,
  })
  current_location: PackageLocation;

  @ManyToMany(() => PackageLocation, { nullable: false })
  @JoinTable({ name: 'package_locations' })
  package_locations: PackageLocation[];

  // @ManyToOne(() => Payment, (payment) => payment.packages, { nullable: false })
  // payment: Payment;

  @ManyToOne(() => DeliveryOrder, (order) => order.packages, {
    nullable: false,
    eager: true,
  })
  order: DeliveryOrder;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
