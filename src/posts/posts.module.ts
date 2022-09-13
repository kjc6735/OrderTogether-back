import { Store } from './../entities/store.entity';
import { Category } from './../entities/category.entity';
import { User } from './../entities/user.entity';
import { Post } from './../entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category, Store])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
