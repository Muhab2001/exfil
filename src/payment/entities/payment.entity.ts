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
<<<<<<< HEAD
  @Column({ type: 'smallint', default: 0 })
  fulfilled: number;

  @ManyToOne(() => Customer, { nullable: true, onDelete: 'SET NULL' })
=======
  @Column({ type: 'smallint' })
  fulfilled: number;

  @ManyToOne(() => Customer, { nullable: false })
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // @OneToMany(() => Package, (pkg) => pkg.payment, {
  //   lazy: true,
  //   cascade: true,
  //   nullable: false,
  // })
  // packages: Promise<Package[]>;

<<<<<<< HEAD
  @OneToOne(() => DeliveryOrder, (order) => order.payment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
=======
  @OneToOne(() => DeliveryOrder, (order) => order.payment, { lazy: true })
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  order: Promise<DeliveryOrder>;
}
