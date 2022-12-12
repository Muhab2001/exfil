import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateRetailCenterDto } from './dto/create-retail_center.dto';
import { UpdateRetailCenterDto } from './dto/update-retail_center.dto';
import { RetailCenter } from './entities/retail_center.entity';

@Injectable()
export class RetailCenterService {
  constructor(
    @InjectRepository(RetailCenter)
    private retailCenterRepo: Repository<RetailCenter>,
    @InjectRepository(Address)
    private addresRepo: Repository<Address>,
  ) {}

  async create(createRetailCenterDto: CreateRetailCenterDto) {
    const { name, type, ...address } = createRetailCenterDto;

    return await this.retailCenterRepo.save({
      name: name,
      type: type,
      address: address,
    });
  }

  findAll() {
    return `This action returns all retailCenter`;
  }

  async findOne(id: number) {
    return await this.retailCenterRepo.findOneByOrFail({ id: id });
  }

  async updateRetailCenter(
    id: number,
    updateRetailCenterDto: UpdateRetailCenterDto,
  ) {
    return await this.retailCenterRepo.update(
      { id: id },
      updateRetailCenterDto,
    );
  }

  async delete(id: number) {
    return await this.retailCenterRepo.delete(id);
  }
}
