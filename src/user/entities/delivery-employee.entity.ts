import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { Entity, ManyToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class DeliveryEmployee extends Employee {
  @ManyToMany(() => DeliveryOrder, (order) => order.deliveryEmployees, {
    lazy: true,
    nullable: true,
  })
  orders: Promise<DeliveryOrder[]>;
}
