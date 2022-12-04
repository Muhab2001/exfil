import { RetailCenter } from 'src/package/retail_center/entities/retail_center.entity';
import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from './employee.entity';
import { User } from './user.entity';

@Entity()
export class RetailEmployee extends Employee {
  @ManyToOne(() => RetailCenter, (retailCenter) => retailCenter.employees)
  retail_center: RetailCenter;
}
