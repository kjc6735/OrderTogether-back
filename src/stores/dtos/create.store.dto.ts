import { Store } from './../../entities/store.entity';
import { PickType } from '@nestjs/mapped-types';
import { ResponseDto } from './../../common/dtos/response.dto';

export class CreateStoreRequestDto extends PickType(Store, ['name']) {
  category: number;
}

export class CreateStoreResponsetDto extends ResponseDto {}
