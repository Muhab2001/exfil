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

  @ManyToOne(() => PackageLocation, {
    nullable: false,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  start_location: PackageLocation;

  @ManyToOne(() => PackageLocation, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  end_location: PackageLocation;

  @ManyToOne(() => DeliveryOrder, (order) => order.transport_events, {
    nullable: false,
    onUpdate: 'CASCADE',
  })
  order: DeliveryOrder;

  @ManyToOne(() => DeliveryEmployee, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  delivery_employee: DeliveryEmployee;
}
