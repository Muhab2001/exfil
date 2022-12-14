import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoAddress } from 'src/package/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateRetailCenterDto } from './dto/create-retail_center.dto';
import { UpdateRetailCenterDto } from './dto/update-retail_center.dto';
import { RetailCenter } from './entities/retail_center.entity';

@Injectable()
export class RetailCenterService {
  constructor(
    @InjectRepository(RetailCenter)
    private retailCenterRepo: Repository<RetailCenter>,
    @InjectRepository(GeoAddress)
    private addresRepo: Repository<GeoAddress>,
  ) {}

  async create(createRetailCenterDto: CreateRetailCenterDto) {
    const { name, type, ...address } = createRetailCenterDto;

    let savedAddress = await this.addresRepo.findOneBy(address);

    if (!savedAddress)
      savedAddress = await this.addresRepo.save({ ...address });
    return await this.retailCenterRepo.insert({
      name: name,
      type: type,
      address: savedAddress,
    });
  }

  async findAll() {
    return await this.retailCenterRepo.find({
      select: {
        address: {
          city: true,
          country: true,
          zipcode: true,
          street: true,
        },
      },
    });
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
