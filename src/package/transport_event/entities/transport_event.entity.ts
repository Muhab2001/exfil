import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { PackageLocation } from 'src/package/entities/package-location.entity';
import { DeliveryEmployee } from 'src/user/entities/delivery-employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../event.enum';

@Entity()
export class TransportEvent {
  @PrimaryGeneratedColumn()
  schedule_number: number;

  @Column({ type: 'text', nullable: false })
  type: EventType;

  @OneToOne(() => PackageLocation, {
    nullable: false,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  start_location: PackageLocation;

  @OneToOne(() => PackageLocation, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  end_location: PackageLocation;

  @ManyToOne(() => DeliveryOrder, (order) => order.transport_events, {
    nullable: false,
  })
  order: DeliveryOrder;

  @OneToOne(() => DeliveryEmployee, { nullable: false })
  @JoinColumn()
  delivery_employee: DeliveryEmployee;
}
