import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { PackageLocation } from '../entities/package-location.entity';
import { Package } from '../entities/package.entity';
import { OrderService } from '../orders/order.service';
import { PackageService } from '../package.service';
import { TransportEvent } from '../transport_event/entities/transport_event.entity';
import { LocationDto } from './insert-location.dto';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(PackageLocation)
    private locationRepo: Repository<PackageLocation>,
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    @InjectRepository(TransportEvent)
    private eventRepo: Repository<TransportEvent>,

    @InjectRepository(Package)
    private packageRepo: Repository<Package>,
    private readonly packagesService: PackageService,
    private readonly ordersService: OrderService,
  ) {}

  async registerOrderLocation(
    order_id: number,
    insertLocationDto: LocationDto,
  ) {
    console.log(insertLocationDto);

    // fetch the order, and get the current location of one of the packages
    const order = await this.ordersService.findOne(order_id);

    const address = await this.addressRepo.save({
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

    if (address === order.final_destination) {
      order.isDelivered = 1;
      // TODO: send an email notification about package arrival
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

  async remove(id: number) {
    await this.locationRepo.delete(id);
  }
}
