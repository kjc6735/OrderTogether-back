import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: { jwtSecret: string }): DynamicModule {
    return {
      module: JwtModule,
      imports: [TypeOrmModule.forFeature([User])],
      providers: [
        JwtService,
        {
          provide: 'secretKey',
          useValue: options.jwtSecret,
        },
      ],
      exports: [JwtService],
    };
  }
}
