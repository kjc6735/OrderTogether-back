import { LoggedInMiddleware } from './middlewares/loggedin.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { Category } from './entities/category.entity';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { Store } from './entities/store.entity';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Category, Store],
        synchronize: true,
      }),
    }),
    JwtModule.forRoot({ jwtSecret: process.env.JWT_SECRET }),
    UsersModule,
    CategoriesModule,
    StoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer
      .apply(LoggedInMiddleware)
      .exclude({ path: 'users/*', method: RequestMethod.ALL }, 'users/(.*)')
      .forRoutes('*');
  }
}
