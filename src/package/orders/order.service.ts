import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { send } from 'process';
import { GeoAddress } from 'src/package/entities/address.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { UserService } from 'src/user/user.service';
import { Equal, Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { DeliveryOrder } from '../entities/delivery_order.entity';
import { Package } from '../entities/package.entity';
import { PackageLocation } from '../entities/package-location.entity';
import { PackageLocationType } from '../enums/package-location.enum';
import { EmailsService } from 'src/emails/emails.service';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Inject } from '@nestjs/common/decorators';
import { Role } from 'src/auth/role.enum';
import { Cache } from 'cache-manager';

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
    @InjectRepository(GeoAddress)
    private addresRepo: Repository<GeoAddress>,
    private readonly usersService: UserService,
    private readonly emailsService: EmailsService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOneRaw(id: number) {
    const result = await this.ordersRepo.findOneOrFail({
      relations: {
        packages: {
          package_locations: true,
        },
      },
      where: {
        id: id,
      },
    });

    return result;
  }

  async findOne(orderId: number, userId: string, userRole: Role) {
    const order = await this.ordersRepo.findOneOrFail({
      relations: {
        packages: {
          package_locations: true,
        },
      },
      where: {
        id: orderId,
      },
    });

    if (userRole === Role.Customer) {
      return {
        ...order,
        isOTPSent:
          (await this.cacheManager.get(userId + '-otp')) !== undefined ? 1 : 0,
      };
    }

    return order;
  }

  async save(order: DeliveryOrder) {
    await this.ordersRepo.save(order);
  }

  async createOrder(
    retail_employee_id: string,
    CreateOrderDto: CreateOrderDto,
  ) {
    const recipient = await this.usersService.findOneCustomerByEmail(
      CreateOrderDto.recipient,
    );
    const sender = await this.usersService.findOneCustomerByEmail(
      CreateOrderDto.sender,
    );

    const delivery_employee =
      await this.usersService.findOneDeliveryEmployeeByEmail(
        CreateOrderDto.delivery_employee,
      );

    const retail_employee = await this.usersService.findOneRetailEmployee(
      retail_employee_id,
    );

    const center_location = retail_employee.retail_center.address;

    const payment = this.paymentsRepo.create({
      amount: CreateOrderDto.payment,
      issue_date: new Date().toLocaleString(),
      fulfilled: 0,
      customer: sender,
    });

    const currentLocation = await this.locationsRepo.save({
      timestamp: new Date().toLocaleString(),
      type: PackageLocationType.WAREHOUSE,
      address: center_location,
    });

    console.log(currentLocation);

    const final_destination = this.addresRepo.create({
      country: CreateOrderDto.country,
      city: CreateOrderDto.city,
      street: CreateOrderDto.street,
      zipcode: CreateOrderDto.zipcode,
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
        current_location: currentLocation,
        package_locations: [currentLocation],
      });
    });

    const order = this.ordersRepo.create({
      isDelivered: 0,
      deliveryEmployee: delivery_employee,
      sender: sender,
      recipient: recipient,
      packages: packages,
      retail_employee: retail_employee,
      payment: payment,
      final_destination: final_destination,
    });
    // creates an order
    const savedOrder = await this.ordersRepo.save(order);
    console.log(savedOrder);

    // TODO: send email to confirm order creation
    await this.emailsService.sendEmail({
      email: sender.email,
      subject: 'Order Confirmation',
      template: 'order-confirm',
      context: {
        username: sender.user.username,
        orderNo: savedOrder.id,
      },
    });

    return savedOrder;
  }

  async updateOrder(order_id: number, UpdateOrderDto: UpdateOrderDto) {
    // updating all non-nested items directly, and then updating the packages

    const existingOrder = await this.ordersRepo.findOneByOrFail({
      id: order_id,
    });

    console.log(existingOrder);

    const {
      delivery_employee: delivery_employee_email,
      recipient: recipient_email,
      sender: sender_email,
      payment: payment_amount,
      ...otherProps
    } = UpdateOrderDto;

    const updateOptions = { ...otherProps };

    if (recipient_email)
      existingOrder.recipient = await this.usersService.findOneCustomerByEmail(
        recipient_email,
      );
    if (sender_email)
      existingOrder.sender = await this.usersService.findOneCustomerByEmail(
        sender_email,
      );

    if (delivery_employee_email)
      existingOrder.deliveryEmployee =
        await this.usersService.findOneDeliveryEmployeeByEmail(
          delivery_employee_email,
        );

    if (payment_amount) existingOrder.payment.amount = payment_amount;

    if (
      otherProps.city &&
      otherProps.country &&
      otherProps.street &&
      otherProps.zipcode
    ) {
      existingOrder.final_destination = this.addresRepo.create({
        ...otherProps,
      });
    }
    await this.ordersRepo.save(existingOrder);
  }

  async findDeliveryEmployeeOrders(deliveryEmpId: number) {
    return this.ordersRepo.findBy({
      deliveryEmployee: Equal(deliveryEmpId),
      isDelivered: 0,
    });
  }

  async findRetailEmployeeOrders(retailEmpId: number) {
    return this.ordersRepo.findBy({
      retail_employee: Equal(retailEmpId),
      isDelivered: 0,
    });
  }

  async findCustomerDeliveryOrder(
    customerId: string,
    orderSide: 'recipient' | 'sender',
  ) {
    if (orderSide === 'recipient') {
      return await this.ordersRepo.findBy({ recipient: Equal(customerId) });
    } else if (orderSide === 'sender') {
      return await this.ordersRepo.findBy({ sender: Equal(customerId) });
    }
  }

  async deleteOrder(orderId: number) {
    await this.ordersRepo.delete(orderId);
  }
}
