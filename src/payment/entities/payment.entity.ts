import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { Package } from 'src/package/entities/package.entity';
import { Customer } from 'src/user/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  issue_date: string;

  @Column({ type: 'datetime', nullable: true })
  process_date: string;

  // 0: payment is pending, 1: payment if fulfilled
  @Column({ type: 'smallint', default: 0 })
  fulfilled: number;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // @OneToMany(() => Package, (pkg) => pkg.payment, {
  //   lazy: true,
  //   cascade: true,
  //   nullable: false,
  // })
  // packages: Promise<Package[]>;

  @OneToOne(() => DeliveryOrder, (order) => order.payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Promise<DeliveryOrder>;
}
