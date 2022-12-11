import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { send } from 'process';
import { Address } from 'src/address/entities/address.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { UserService } from 'src/user/user.service';
import { Equal, Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { DeliveryOrder } from '../entities/delivery_order.entity';
import { Package } from '../entities/package.entity';
import { PackageLocation } from '../entities/package-location.entity';
import { PackageLocationType } from '../enums/package-location.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(DeliveryOrder)
    private ordersRepo: Repository<DeliveryOrder>,
    @InjectRepository(Payment)
    private paymentsRepo: Repository<Payment>,
    @InjectRepository(Package)
    private packagesRepo: Repository<Package>,
    @InjectRepository(PackageLocation)
    private locationsRepo: Repository<PackageLocation>,
    @InjectRepository(Address)
    private addresRepo: Repository<Address>,
    private readonly usersService: UserService,
  ) {}

  async findOne(id: number) {
    return await this.ordersRepo.findOneByOrFail({ id: id });
  }

  async createOrder(CreateOrderDto: CreateOrderDto) {
    const recipient = await this.usersService.findOneCustomer(
      CreateOrderDto.recipient.email,
    );
    const sender = await this.usersService.findOneCustomer(
      CreateOrderDto.sender.email,
    );

    const delivery_employee = await this.usersService.findOneDeliveryEmployee(
      CreateOrderDto.delivery_employee,
    );

    const payment = this.paymentsRepo.create({
      amount: CreateOrderDto.payment,
      issue_date: new Date().toLocaleString(),
      fulfilled: 0,
      customer: sender,
    });

    const currentLocation = this.locationsRepo.create({
      timestamp: new Date().toLocaleString(),
      type: PackageLocationType.WAREHOUSE,
      address: await this.addresRepo.save({
        country: CreateOrderDto.country,
        city: CreateOrderDto.city,
        street: CreateOrderDto.street,
        zip_code: CreateOrderDto.zipcode,
      }),
    });

    const packages = CreateOrderDto.packages.map((pkg) => {
      return this.packagesRepo.create({
        category: pkg.category,
        status: pkg.status,
        width: pkg.width,
        length: pkg.length,
        height: pkg.height,
        weight: pkg.weight,
        entry_timestamp: new Date().toLocaleString(),
        delivery_date: CreateOrderDto.delivery_date,
        current_location: currentLocation,
        package_locations: [currentLocation],
      });
    });

    const order = this.ordersRepo.create({
      isDelivered: 0,
      deliveryEmployee: delivery_employee,
      sender: sender,
      recipient: recipient,
      packages: Promise.resolve(packages),
    });
    // creates an order
  }

  async updateOrder(UpdateOrderDto: UpdateOrderDto) {
    // updating all non-nested items directly, and then updating the packages
  }

  async findDeliveryOrders(deliveryEmpId: number) {
    return this.ordersRepo.findBy({ deliveryEmployee: Equal(deliveryEmpId) });
  }

  async findCustomerDeliveryOrder(
    customerId: number,
    orderSide: 'recipient' | 'sender',
  ) {
    if (orderSide === 'recipient') {
      return await this.ordersRepo.findBy({ recipient: Equal(customerId) });
    } else if (orderSide === 'sender') {
      return await this.ordersRepo.findBy({ recipient: Equal(customerId) });
    }
  }
}
