import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailsService } from 'src/emails/emails.service';
import { GeoAddress } from 'src/package/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PackageLocation } from '../entities/package-location.entity';
import { Package } from '../entities/package.entity';
import { OrderService } from '../orders/order.service';
import { PackageService } from '../package.service';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { LocationDto } from './insert-location.dto';
import { PackageStatus } from '../enums/package-status.enum';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(PackageLocation)
    private locationRepo: Repository<PackageLocation>,
    @InjectRepository(GeoAddress)
    private addressRepo: Repository<GeoAddress>,
    @InjectRepository(TransportEvent)
    private eventRepo: Repository<TransportEvent>,
    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
    private readonly ordersService: OrderService,
    private readonly emailsService: EmailsService,
  ) {}

  async registerOrderLocation(
    order_id: number,
    insertLocationDto: LocationDto,
  ) {
    console.log(insertLocationDto);

    // fetch the order, and get the current location of one of the packages
    const order = await this.ordersService.findOneRaw(order_id);

    let address = await this.addressRepo.findOneBy({
      country: insertLocationDto.country,
      city: insertLocationDto.city,
      street: insertLocationDto.street,
      zipcode: insertLocationDto.zipcode,
    });
    if (!address)
      address = await this.addressRepo.save({
        country: insertLocationDto.country,
        city: insertLocationDto.city,
        street: insertLocationDto.street,
        zipcode: insertLocationDto.zipcode,
      });
    // add the new location
    const NewLocation = this.locationRepo.create({
      timestamp: new Date().toLocaleString(),
      address: address,
      packages: Promise.resolve(order.packages),
      type: insertLocationDto.locationType,
    });
    console.log('FINAL', address, order.final_destination);

    if (
      address.city === order.final_destination.city &&
      address.country === order.final_destination.country &&
      address.street === order.final_destination.street &&
      address.zipcode === order.final_destination.zipcode
    ) {
      order.isDelivered = 1;
      // TODO: send an email notification about package arrival
      if (order.recipient)
        await this.emailsService.sendEmail({
          email: order.recipient.email,
          subject: `Order #${order_id} delivered!`,
          template: 'arrival',
          context: {
            username: order.recipient.user.username,
            orderNo: order_id,
          },
        });

      let delay_fine = 0;
      const delivery_timestamp = new Date();
      const expected_date_epoch = new Date(
        order.packages[0].expected_delivery_date,
      ).getTime();
      if (delivery_timestamp.getTime() > expected_date_epoch)
        delay_fine =
          Math.floor(
            (delivery_timestamp.getTime() - expected_date_epoch) /
              1000 /
              60 /
              60 /
              24,
          ) * 5; // 5 riyals for each day late;

      await this.packageRepo.save(
        order.packages.map((pkg) => ({
          ...pkg,
          delivery_date:
            pkg.status !== PackageStatus.LOST
              ? delivery_timestamp.toISOString()
              : null,
          delay_fine: delay_fine,
        })),
      );

      await this.ordersService.save(order);
    }
    // record the new event
    const transportEvent = await this.eventRepo.save({
      delivery_employee: order.deliveryEmployee,
      order: order,
      start_location: (await order.packages)[0].current_location,
      end_location: NewLocation,
      type: insertLocationDto.eventType,
    });
    // update the statuss of onboard packages
    let updatedPackages: Package[] = order.packages.map((pkg) => {
      console.log(pkg);

      return {
        ...pkg,
        current_location: NewLocation,
        status: insertLocationDto.statuses[pkg.package_number.toString()],
        package_locations: [...pkg.package_locations, NewLocation],
      };
    });

    updatedPackages = await this.packageRepo.save(updatedPackages);

    //  link updates to the order object and save
  }

  async findAllCities() {
    return await this.addressRepo.manager.query(
      'SELECT DISTINCT city FROM geo_address',
    );
  }
  async remove(id: number) {
    await this.locationRepo.delete(id);
  }
}
