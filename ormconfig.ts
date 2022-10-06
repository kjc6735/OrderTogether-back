import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Room } from './src/entities/room.entity';
import { DM } from './src/entities/dm.entity';
import { Post } from './src/entities/post.entity';
import { Store } from './src/entities/store.entity';
import { Category } from './src/entities/category.entity';
import { User } from './src/entities/user.entity';
import * as dotenv from 'dotenv';

//typeorm seed에서는 .env를 불러와서 사용하기 떄문에 env파일이 여러개 일 경우 에러가 발생한다.
// 추측 : nestjs 시작 시 .env파일을 찾아서 그것을 로드해서 사용하지만 seed:run같은 경우는 nestjs를 실행하는게 아니라 이 설정파일만 보고 만들어주기 때문에
// 여기서는 .env를 읽어온다. .env는 없는 파일이기 때문에 오류가 나는 것이다.
// 해결하기 위해 package.json에 seed:run 부분에 NODE_ENV를 주었다.
// cross-env NODE_ENV=dev
// 어차피 dev일 때 사용하기 떄문에 path를 그냥 .env.dev로 놔도 된다..
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
