import { SetMetadata } from '@nestjs/common';

export const ID_PARAM = 'id_param';
export const OwnerEntityKey = (param: string) => SetMetadata(ID_PARAM, param);
