import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Room } from './src/entities/room.entity';
import { DM } from './src/entities/dm.entity';
import { Post } from './src/entities/post.entity';
import { Store } from './src/entities/store.entity';
import { Category } from './src/entities/category.entity';
import { User } from './src/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Category, Store, Post, DM, Room],
  logging: true,
  synchronize: true,
  migrations: [__dirname + '/src/migrations/*.ts'],
  //   cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
};
