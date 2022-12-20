<<<<<<< HEAD
import { GeoAddress } from 'src/package/entities/address.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { DeliveryEmployee } from 'src/user/entities/delivery-employee.entity';
import { RetailEmployee } from 'src/user/entities/retail-employee.entity';
=======
import { Payment } from 'src/payment/entities/payment.entity';
import { DeliveryEmployee } from 'src/user/entities/delivery-employee.entity';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
<<<<<<< HEAD
  Column,
  ManyToOne,
} from 'typeorm';
import { PackageStatus } from '../enums/package-status.enum';
=======
} from 'typeorm';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class DeliveryOrder {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Column({ type: 'smallint' })
  isDelivered: number;

  //   each order is possible shipped by multiple employees, and an employee can ship multiple orders
  @ManyToOne(() => DeliveryEmployee, (emp) => emp.orders, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  deliveryEmployee: DeliveryEmployee;

  //   each order ships multiple packages
  @OneToMany(() => Package, (pkg) => pkg.delivery_order, {
    nullable: false,
    cascade: true,
  })
  packages: Package[];

  @OneToMany(() => TransportEvent, (event) => event.order, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  transport_events: TransportEvent[];

  @OneToOne(() => Payment, { nullable: false, eager: true, cascade: true })
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Customer, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'recipientId' })
  recipient: Customer;

  @ManyToOne(() => Customer, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'senderId' })
  sender: Customer;
  //? registered by:
  @ManyToOne(() => RetailEmployee, (emp) => emp.orders, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  retail_employee: RetailEmployee;

  @ManyToOne(() => GeoAddress, { nullable: false, eager: true, cascade: true })
  @JoinColumn()
  final_destination: GeoAddress;
=======
  //   each order is possible shipped by multiple employees, and an employee can ship multiple orders
  @ManyToMany(() => DeliveryEmployee, (emp) => emp.orders, {
    lazy: true,
    nullable: false,
  })
  @JoinTable({
    name: 'delivery_order_employees',
  })
  deliveryEmployees: Promise<DeliveryEmployee[]>;

  //   each order ships multiple packages
  @OneToMany(() => Package, (pkg) => pkg.order, { lazy: true })
  packages: Promise<Package[]>;

  @OneToMany(() => TransportEvent, (event) => event.order, { nullable: false })
  @JoinColumn()
  transport_event: TransportEvent[];

  @OneToOne(() => Payment, { nullable: false, eager: true })
  @JoinColumn()
  payment: Payment;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
