import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { PackageLocation } from 'src/package/entities/package-location.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class TransportEvent {
  @PrimaryColumn({ type: 'text' })
  schedule_number: string;

  @Column({ type: 'int', nullable: false })
  type: number; //TODO: replace with an enum

  @OneToMany(() => PackageLocation, (location) => location.transport_event, {
    lazy: true,
  })
  delivery_route: Promise<Location[]>;

  @ManyToOne(() => DeliveryOrder, (order) => order.transport_event, {
    nullable: false,
  })
  order: DeliveryOrder;
}
