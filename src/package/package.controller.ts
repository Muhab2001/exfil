import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import bodyParser from 'body-parser';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetPackagesDto } from './dto/get-packages.dto';
import { Query } from '@nestjs/common/decorators';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  findAll(@Query() GetPackagesDto: GetPackagesDto) {
    return this.packageService.findAll(GetPackagesDto);
  }

  @Get('order/:id')
  findOrders(@Param('id') orderId: number) {
    return this.packageService.findOrderPackages(orderId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Get(':id/locations')
  findOneLocations(@Param('id') id: string) {
    // return this.packageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
