<<<<<<< HEAD
import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
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
  @ManyToOne(() => RetailCenter, (retailCenter) => retailCenter.employees, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  retail_center: RetailCenter;

<<<<<<< HEAD
  @OneToMany(() => DeliveryOrder, (ord) => ord.retail_employee, {
    lazy: true,
    nullable: true,
  })
  orders: Promise<DeliveryOrder[]>;
=======
  @OneToMany(() => Package, (pkg) => pkg.retail_employee, {
    lazy: true,
    nullable: true,
  })
  packages: Promise<Package[]>;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
