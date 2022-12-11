import { DeliveryOrder } from 'src/package/entities/delivery_order.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class DeliveryEmployee extends Employee {
  @OneToMany(() => DeliveryOrder, (order) => order.deliveryEmployee, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  orders: Promise<DeliveryOrder[]>;
}
