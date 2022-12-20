import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { PackageLocation } from 'src/package/entities/package-location.entity';
<<<<<<< HEAD
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
=======
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a

@Entity()
export class TransportEvent {
  @PrimaryGeneratedColumn()
  schedule_number: number;

  @Column({ type: 'text', nullable: false })
  type: EventType;

<<<<<<< HEAD
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
=======
  @OneToMany(() => PackageLocation, (location) => location.transport_event, {
    lazy: true,
  })
  delivery_route: Promise<Location[]>;

  @ManyToOne(() => DeliveryOrder, (order) => order.transport_event, {
    nullable: false,
  })
  order: DeliveryOrder;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
