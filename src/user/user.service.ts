import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
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
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DeliveryEmployee)
    private deliveryEmployeeRepo: Repository<DeliveryEmployee>,
    @InjectRepository(RetailEmployee)
    private retailEmployee: Repository<RetailEmployee>,
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

  async findAllCustomers() {
    return await this.customerRepo.findBy({});
  }

  async findAllDeliveryEmployees() {
    return await this.deliveryEmployeeRepo.findBy({});
  }

  async findAllRetailEmployees() {
    return await this.retailEmployee.findBy({});
  }

  async findOneUserById(id: string) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findOneCustomer(id: string) {
    return await this.customerRepo.findOneByOrFail({ user: Equal(id) });
  }

  async findOneDeliveryEmployee(id: string) {
    return await this.deliveryEmployeeRepo.findOneByOrFail({ user: Equal(id) });
  }

  async findOneRetailEmployee(id: string) {
    return await this.retailEmployee.findOneByOrFail({ user: Equal(id) });
  }

  async updateCustomer(inputId: string, updateUserDto: UpdateUserDto) {
    await this.customerRepo.update(inputId, updateUserDto);
  }

  async updateDeliverEmployee(inputId: string, updateUserDto: UpdateUserDto) {
    await this.deliveryEmployeeRepo.update(inputId, updateUserDto);
  }

  async updateRetailEmployee(inputId: string, updateUserDto: UpdateUserDto) {
    await this.retailEmployee.update(inputId, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
