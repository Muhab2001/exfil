<<<<<<< HEAD
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, In, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Customer } from './entities/customer.entity';
import { DeliveryEmployee } from './entities/delivery-employee.entity';
import { RetailEmployee } from './entities/retail-employee.entity';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/auth/role.enum';
import { Admin } from './entities/admin.entity';
import { GetUserDto } from './dto/get-user.dto';
import { RetailCenter } from 'src/package/retail_center/entities/retail_center.entity';
import { RetailCenterService } from 'src/package/retail_center/retail_center.service';
=======
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
<<<<<<< HEAD
    @InjectRepository(DeliveryEmployee)
    private deliveryEmployeeRepo: Repository<DeliveryEmployee>,
    @InjectRepository(RetailEmployee)
    private retailEmployeeRepo: Repository<RetailEmployee>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private readonly configService: ConfigService,
    private readonly retailCenterService: RetailCenterService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      id: createUserDto.id,
      username: createUserDto.username,
      password: await hash(
        createUserDto.password,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        parseInt(this.configService.get('SALT_ROUNDS')!),
      ),
      role: createUserDto.role,
    });

    await this.userRepository.insert(newUser);

    // we create the related customer/employee objects
    switch (createUserDto.role) {
      case Role.Admin:
        return await this.adminRepo.save({
          company_email: createUserDto.email,
          company_phone: createUserDto.phone_number,
          salary: createUserDto.salary,
          user: newUser,
        });

      case Role.Customer:
        return await this.customerRepo.save({
          email: createUserDto.email,
          phone: createUserDto.phone_number,
          user: newUser,
        });

      case Role.DeliveryEmployee:
        return await this.deliveryEmployeeRepo.save({
          company_email: createUserDto.email,
          company_phone: createUserDto.phone_number,
          salary: createUserDto.salary,
          user: newUser,
        });

      case Role.RetailEmployee:
        return await this.retailEmployeeRepo.save({
          company_email: createUserDto.email,
          company_phone: createUserDto.phone_number,
          salary: createUserDto.salary,
          user: newUser,
          retail_center: await this.retailCenterService.findOne(
            createUserDto.retail_center,
          ),
        });

      default:
        throw new BadRequestException('Invalid user role');
    }
=======
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  }

  // async findAllUsers(findOptions: GetUserDto) {
  //   return [
  //     ...(await this.findAllDeliveryEmployees()),
  //     ...(await this.findAllRetailEmployees()),
  //     ...(await this.findAllCustomers()),
  //   ];
  // }

  async findAllCustomers(GetUserDto: GetUserDto) {
    if (!GetUserDto.username) return await this.customerRepo.findBy({});
    else {
      const users = await this.userRepository.find({
        select: {
          id: true,
        },
        where: {
          username: Like('%' + GetUserDto.username + '%'),
          role: Role.Customer,
        },
      });
      console.log(users);
      return await this.customerRepo.findBy({
        user: In(users.map((user) => user.id)),
      });
    }
  }

  async findAllDeliveryEmployees(GetUserDto: GetUserDto) {
    if (!GetUserDto.username) return await this.deliveryEmployeeRepo.findBy({});
    else {
      const users = await this.userRepository.find({
        select: {
          id: true,
        },
        where: {
          username: ILike(GetUserDto.username),
          role: Role.DeliveryEmployee,
        },
      });
      return await this.deliveryEmployeeRepo.findBy({
        user: In(users.map((user) => user.id)),
      });
    }
  }

<<<<<<< HEAD
  async findAllRetailEmployees(GetUserDto: GetUserDto) {
    if (!GetUserDto.username) return await this.retailEmployeeRepo.findBy({});
    else {
      const users = await this.userRepository.find({
        select: {
          id: true,
        },
        where: {
          username: Like(GetUserDto.username),
          role: Role.RetailEmployee,
        },
      });
      return await this.retailEmployeeRepo.findBy({
        user: In(users.map((user) => user.id)),
      });
    }
=======
  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  }

  async findAllAdmins() {
    return await this.adminRepo.findBy({});
  }

  async findOneUserById(id: string) {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneByOrFail({ username: username });
  }

  async findOneCustomer(id: string) {
    return await this.customerRepo.findOneByOrFail({ user: Equal(id) });
  }

  async findOneDeliveryEmployee(id: string) {
    return await this.deliveryEmployeeRepo.findOneByOrFail({ user: Equal(id) });
  }

  async findOneRetailEmployee(id: string) {
    return await this.retailEmployeeRepo.findOneByOrFail({ user: Equal(id) });
  }

  async findOneCustomerByEmail(email: string) {
    return await this.customerRepo.findOneByOrFail({ email: email });
  }

  async findOneDeliveryEmployeeByEmail(email: string) {
    return await this.deliveryEmployeeRepo.findOneByOrFail({
      company_email: email,
    });
  }

  async findOneRetailEmployeeByEmail(email: string) {
    return await this.retailEmployeeRepo.findOneByOrFail({
      company_email: email,
    });
  }

  async updateCustomer(inputId: string, updateUserDto: UpdateUserDto) {
    const customer = await this.findOneCustomer(inputId);
    const { username, password, phone_number, email } = updateUserDto;

    if (username !== undefined) {
      customer.user.username = username;
    }

    if (email) {
      customer.email = email;
    }
    if (phone_number) {
      customer.phone;
    }
    await this.customerRepo.save(customer);
  }

  async updateDeliverEmployee(inputId: string, updateUserDto: UpdateUserDto) {
    const deliverer = await this.findOneDeliveryEmployee(inputId);

    const { username, password, salary, phone_number, email } = updateUserDto;

    if (username !== undefined) {
      deliverer.user.username = username;
    }

    if (salary) {
      deliverer.salary = salary;
    }

    if (email) {
      deliverer.company_email = email;
    }
    if (phone_number) {
      deliverer.company_phone;
    }
    await this.deliveryEmployeeRepo.save(deliverer);
  }

  async updateRetailEmployee(
    inputId: string,
    updateUserDto: UpdateUserDto & { retail_center: number },
  ) {
    const retailer = await this.findOneRetailEmployee(inputId);
    const { retail_center, username, password, salary, phone_number, email } =
      updateUserDto;

    if (username !== undefined) {
      retailer.user.username = username;
    }

    if (retail_center) {
      retailer.retail_center = await this.retailCenterService.findOne(
        retail_center,
      );
    }

    if (salary) {
      retailer.salary = salary;
    }

    if (email) {
      retailer.company_email = email;
    }
    if (phone_number) {
      retailer.company_phone;
    }
    await this.retailEmployeeRepo.save(retailer);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
