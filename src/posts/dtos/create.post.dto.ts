import { ResponseDto } from './../../common/dtos/response.dto';
import { Post } from './../../entities/post.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreatePostRequestDto extends PickType(Post, [
  'storeId',
  'title',
  'describe',
]) {}

export class CreatePostResponseDto extends ResponseDto {}
