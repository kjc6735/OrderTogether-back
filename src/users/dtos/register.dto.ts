import { ResponseDto } from './../../common/dtos/response.dto';
import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/entities/user.entity';

export class RegisterRequestDto extends PickType(User, [
  'userId',
  'password',
  'zonecode',
  'addressKo',
  'addressEn',
  'detail',
]) {}

export class RegisterResponseDto extends ResponseDto {}
