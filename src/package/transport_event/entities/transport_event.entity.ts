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
} from 'typeorm';
import { EventType } from '../event.enum';

@Entity()
export class TransportEvent {
  @PrimaryColumn({ type: 'text' })
  schedule_number: string;

  @Column({ type: 'text', nullable: false })
  type: EventType; //TODO: replace with an enum

  @OneToMany(() => PackageLocation, (location) => location.transport_event, {
    lazy: true,
  })
  delivery_route: Promise<Location[]>;

  @ManyToOne(() => DeliveryOrder, (order) => order.transport_event, {
    nullable: false,
  })
  order: DeliveryOrder;

  @OneToOne(() => DeliveryEmployee, { nullable: false })
  @JoinColumn()
  delivery_employee: DeliveryEmployee;
}
