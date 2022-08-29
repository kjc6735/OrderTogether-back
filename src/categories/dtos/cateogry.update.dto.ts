import { ResponseDto } from './../../common/dtos/response.dto';
import { Category } from './../../entities/category.entity';
import { PickType } from '@nestjs/mapped-types';

export class CategoryUpdateRequestDto extends PickType(Category, ['name']) {}

export class CategoryUpdateResponseDto extends ResponseDto {}
