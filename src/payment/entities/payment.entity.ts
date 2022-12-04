import { Package } from 'src/package/entities/package.entity';
import { Customer } from 'src/user/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float64' })
  amount: number;

  @CreateDateColumn()
  issue_date: Date;

  @Column({ type: 'datetime', nullable: true })
  process_date: string;

  @Column({ type: 'smallint' })
  isProcessed: number;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @OneToMany(() => Package, (pkg) => pkg.payment, {
    lazy: true,
    cascade: true,
    nullable: false,
  })
  packages: Promise<Package[]>;
}
