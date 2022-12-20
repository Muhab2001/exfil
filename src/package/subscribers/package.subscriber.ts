import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { DeliveryOrder } from '../entities/delivery_order.entity';
// import { DeliveryOrder } from './entities/delivery_order.entity';
import { Package } from '../entities/package.entity';

@EventSubscriber()
export class PackageSubscribe implements EntitySubscriberInterface<Package> {
  listenTo() {
    return Package;
  }

  async afterRemove(event: RemoveEvent<Package>) {
    const orderId = event.entity?.delivery_order.id;
    const orderRepo = event.manager.getRepository(DeliveryOrder);
    const order: DeliveryOrder = await orderRepo.findOneOrFail({
      where: {
        id: orderId,
      },
      relations: {
        packages: true,
      },
    });

    console.log(order.packages);

    if (order.packages.length === 0) {
      await event.manager.query(
        'DELETE FROM delivery_order WHERE id = ' + orderId,
      );
    }

    console.log('DONE!');
  }
}
