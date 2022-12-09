import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageLocation } from '../entities/package-location.entity';
import { PackageService } from '../package.service';
import { LocationDto } from './insert-location.dto';
import { UpdateLocationDto } from './update-location.dto.';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(PackageLocation)
    private locationRepo: Repository<PackageLocation>,
    private readonly packagesService: PackageService,
  ) {}

  async createDeliveryRoute(locationDto: LocationDto) {
    // fetch the packages form the service
    // const location = this.locationRepo.create({
    //   address: locationDto.address_id,
    //   packages:
    // });
  }

  async registerPackagesLocation(location_id: number, paclages: number[]) {
    // fetch the location and reigster the delivery timestamp
    // fetch all packages
    // change current location to the new location
  }

  async updateSingleLocation(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepo.findOneBy({ id: id });
    const updatedParams = {};

    await this.locationRepo.update({ id: id }, updatedParams);
  }

  async remove(id: number) {
    await this.locationRepo.delete(id);
  }
}
