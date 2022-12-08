import { Payment } from 'src/payment/entities/payment.entity';
import { DeliveryEmployee } from 'src/user/entities/delivery-employee.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { Package } from './package.entity';

@Entity()
export class DeliveryOrder {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => Payment, { nullable: false, eager: true, cascade: true })
  @JoinColumn()
  payment: Payment;
}
