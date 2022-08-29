import { Store } from './../entities/store.entity';
import { Category } from './../entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Store])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
