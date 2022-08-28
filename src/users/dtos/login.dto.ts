import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/entities/user.entity';
import { ResponseDto } from './../../common/dtos/response.dto';
export class LoginRequestDto extends PickType(User, [
  'userId',
  'password',
] as const) {}

export class LoginResponseDto extends ResponseDto {
  token?: string;
}
