import { Post } from './../entities/post.entity';
import { Store } from './../entities/store.entity';
import { Category } from './../entities/category.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Category, Post])],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
