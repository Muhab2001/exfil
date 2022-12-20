<<<<<<< HEAD
import { GeoAddress } from 'src/package/entities/address.entity';
=======
import { Address } from 'src/address/entities/address.entity';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { RetailEmployee } from 'src/user/entities/retail-employee.entity';
import {
  Column,
  Entity,
<<<<<<< HEAD
  JoinColumn,
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
<<<<<<< HEAD
import { RetailCenterType } from '../enums/retail-center-type.enum';
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a

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
