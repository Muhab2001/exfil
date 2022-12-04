import { Address } from 'src/address/entities/address.entity';
import { RetailEmployee } from 'src/user/entities/retail_employee.entity';
import { Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class RetailCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'text' })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  type: number; //TODO create an enum type

  @OneToOne(() => Address, { nullable: false })
  address: Address;

  @OneToMany(
    () => RetailEmployee,
    (retailEmployee) => retailEmployee.retail_center,
    { nullable: false, lazy: true },
  )
  employees: Promise<RetailEmployee[]>;
}
