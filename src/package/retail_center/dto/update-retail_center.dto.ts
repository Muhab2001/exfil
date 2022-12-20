import { PartialType } from '@nestjs/mapped-types';
import { CreateRetailCenterDto } from './create-retail_center.dto';

export class UpdateRetailCenterDto extends PartialType(CreateRetailCenterDto) {}
