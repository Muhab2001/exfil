import { GeoAddress } from 'src/package/entities/address.entity';
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

  @OneToOne(() => GeoAddress, { nullable: false, cascade: true, eager: true })
  @JoinColumn()
  address: GeoAddress;

  @OneToMany(
    () => RetailEmployee,
    (retailEmployee) => retailEmployee.retail_center,
    { nullable: false, lazy: true },
  )
  employees: Promise<RetailEmployee[]>;
}
