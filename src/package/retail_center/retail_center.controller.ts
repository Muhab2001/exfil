import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetailCenterService } from './retail_center.service';
import { CreateRetailCenterDto } from './dto/create-retail_center.dto';
import { UpdateRetailCenterDto } from './dto/update-retail_center.dto';

@Controller('retail-center')
export class RetailCenterController {
  constructor(private readonly retailCenterService: RetailCenterService) {}

  @Post()
  create(@Body() createRetailCenterDto: CreateRetailCenterDto) {
    return this.retailCenterService.create(createRetailCenterDto);
  }

  @Get()
  findAll() {
    return this.retailCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retailCenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetailCenterDto: UpdateRetailCenterDto) {
    return this.retailCenterService.update(+id, updateRetailCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retailCenterService.remove(+id);
  }
}
