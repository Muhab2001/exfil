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
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DeliveryEmployee)
    private deliveryEmployeeRepo: Repository<DeliveryEmployee>,
    @InjectRepository(RetailEmployee)
    private retailEmployeeRepo: Repository<RetailEmployee>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private readonly configService: ConfigService,
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
          phone_number: createUserDto.phone_number,
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
        return await this.adminRepo.save({
          company_email: createUserDto.email,
          company_phone: createUserDto.phone_number,
          salary: createUserDto.salary,
          user: newUser,
        });

      default:
        throw new BadRequestException('Invalid user role');
    }
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
      const users = await this.userRepository.findBy({
        username: ILike('%' + GetUserDto.username + '%'),
      });
      return await this.customerRepo.findBy({ user: In(users) });
    }
  }

  async findAllDeliveryEmployees(GetUserDto: GetUserDto) {
    if (!GetUserDto.username) return await this.deliveryEmployeeRepo.findBy({});
    else {
      const users = await this.userRepository.findBy({
        username: Like(GetUserDto.username),
      });
      return await this.deliveryEmployeeRepo.findBy({ user: In(users) });
    }
  }

  async findAllRetailEmployees(GetUserDto: GetUserDto) {
    if (!GetUserDto.username) return await this.retailEmployeeRepo.findBy({});
    else {
      const users = await this.userRepository.findBy({
        username: Like(GetUserDto.username),
      });
      return await this.retailEmployeeRepo.findBy({ user: In(users) });
    }
  }

  async findAllAdmins() {
    return await this.adminRepo.findBy({});
  }

  async findOneUserById(id: string) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findOneCustomer(email: string) {
    return await this.customerRepo.findOneByOrFail({ email: email });
  }

  async findOneDeliveryEmployee(email: string) {
    return await this.deliveryEmployeeRepo.findOneByOrFail({
      company_email: email,
    });
  }

  async findOneRetailEmployee(id: string) {
    return await this.retailEmployeeRepo.findOneByOrFail({ user: Equal(id) });
  }

  async updateCustomer(inputId: string, updateUserDto: UpdateUserDto) {
    await this.customerRepo.update(inputId, updateUserDto);
  }

  async updateDeliverEmployee(inputId: string, updateUserDto: UpdateUserDto) {
    await this.deliveryEmployeeRepo.update(inputId, updateUserDto);
  }

  async updateRetailEmployee(inputId: string, updateUserDto: UpdateUserDto) {
    await this.retailEmployeeRepo.update(inputId, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
