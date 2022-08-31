import { ResponseDto } from './../../common/dtos/response.dto';
import { Store } from './../../entities/store.entity';
import { PickType } from '@nestjs/mapped-types';

export class StoreUpdateRequestDto extends PickType(Store, ['name']) {
  categoryId: number;
}

export class StoreUpdateReponseDto extends ResponseDto {}
