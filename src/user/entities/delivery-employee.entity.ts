import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
<<<<<<< HEAD
import { TransportEvent } from 'src/package/transport_event/entities/transport_event.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
=======
import { Entity, ManyToMany } from 'typeorm';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
import { Employee } from './employee.entity';

@Entity()
export class DeliveryEmployee extends Employee {
<<<<<<< HEAD
  @OneToMany(() => DeliveryOrder, (order) => order.deliveryEmployee, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  orders: Promise<DeliveryOrder[]>;

  @OneToMany(() => TransportEvent, (ev) => ev.delivery_employee, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  event: TransportEvent[];
=======
  @ManyToMany(() => DeliveryOrder, (order) => order.deliveryEmployees, {
    lazy: true,
    nullable: true,
  })
  orders: Promise<DeliveryOrder[]>;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
}
