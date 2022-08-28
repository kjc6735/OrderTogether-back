import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { User } from 'src/entities/user.entity';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: { jwtSecret: string }): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        JwtService,
        {
          provide: 'jwtSecret',
          useValue: options,
        },
      ],
      exports: [JwtService],
    };
  }
}
