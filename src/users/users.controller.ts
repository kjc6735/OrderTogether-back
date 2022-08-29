import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { UsersService } from './users.service';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.usersService.login(loginRequestDto);
  }
  @Post('/register')
  register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.usersService.register(registerRequestDto);
  }
}
