import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { Package } from 'src/package/entities/package.entity';
import { RetailCenter } from 'src/package/retail_center/entities/retail_center.entity';
import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Employee } from './employee.entity';
import { User } from './user.entity';

@Entity()
export class RetailEmployee extends Employee {
  @ManyToOne(() => RetailCenter, (retailCenter) => retailCenter.employees)
  retail_center: RetailCenter;

  @OneToMany(() => DeliveryOrder, (ord) => ord.retail_employee, {
    lazy: true,
    nullable: true,
  })
  orders: Promise<DeliveryOrder[]>;
}
