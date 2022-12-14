import { User } from './../../entities/user.entity';
import { ResponseDto } from './../../common/dtos/response.dto';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class RegisterRequestDto extends PickType(User, [
  'userId',
  'displayName',
  'password',
  'zonecode',
  'addressKo',
  'addressEn',
  'detail',
]) {}

export class RegisterResponseDto extends ResponseDto {}
