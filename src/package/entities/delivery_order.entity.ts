import { Payment } from 'src/payment/entities/payment.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { DeliveryEmployee } from 'src/user/entities/delivery-employee.entity';
import { RetailEmployee } from 'src/user/entities/retail-employee.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { PackageStatus } from '../enums/package-status.enum';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class DeliveryOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  isDelivered: number;

  //   each order is possible shipped by multiple employees, and an employee can ship multiple orders
  @ManyToOne(() => DeliveryEmployee, (emp) => emp.orders, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({})
  deliveryEmployee: DeliveryEmployee;

  //   each order ships multiple packages
  @OneToMany(() => Package, (pkg) => pkg.order, { lazy: true, nullable: false })
  packages: Promise<Package[]>;

  @OneToMany(() => TransportEvent, (event) => event.order, { nullable: true })
  @JoinColumn()
  transport_event: TransportEvent[];

  @OneToOne(() => Payment, { nullable: false, eager: true, cascade: true })
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Customer, { nullable: false, eager: true })
  @JoinColumn({ name: 'customerId' })
  recipient: Customer;

  @ManyToOne(() => Customer, { nullable: false, eager: true })
  @JoinColumn({ name: 'customerId' })
  sender: Customer;
  //? registered by:
  @ManyToOne(() => RetailEmployee, (emp) => emp.orders, { eager: true })
  retail_employee: RetailEmployee;
}
