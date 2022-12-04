import { Injectable } from '@nestjs/common';
import { CreateRetailCenterDto } from './dto/create-retail_center.dto';
import { UpdateRetailCenterDto } from './dto/update-retail_center.dto';

@Injectable()
export class RetailCenterService {
  create(createRetailCenterDto: CreateRetailCenterDto) {
    return 'This action adds a new retailCenter';
  }

  findAll() {
    return `This action returns all retailCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retailCenter`;
  }

  update(id: number, updateRetailCenterDto: UpdateRetailCenterDto) {
    return `This action updates a #${id} retailCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} retailCenter`;
  }
}
