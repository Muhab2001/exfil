import { Address } from 'src/address/entities/address.entity';
import { RetailEmployee } from 'src/user/entities/retail-employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RetailCenterType } from '../enums/retail-center-type.enum';

@Entity()
export class RetailCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'text' })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  type: RetailCenterType; //TODO create an enum type

  @OneToOne(() => Address, { nullable: false, cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(
    () => RetailEmployee,
    (retailEmployee) => retailEmployee.retail_center,
    { nullable: true, lazy: true },
  )
  employees: Promise<RetailEmployee[]>;
}
