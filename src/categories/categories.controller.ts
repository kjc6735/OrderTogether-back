import { CategoryUpdateRequestDto } from './dtos/cateogry.update.dto';
import { Category } from './../entities/category.entity';
import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get('/')
  getAll(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post('/')
  create(@Body('name') name) {
    return this.categoriesService.createCategory(name);
  }

  @Get('/:id/stores')
  getStores(@Param('id') id) {
    return this.categoriesService.getStoresByCategoryId(id);
  }

  @Put('/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() categoryUpdateRequestDto: CategoryUpdateRequestDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryUpdateRequestDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id) {
    return this.categoriesService.deleteCategory(id);
  }
}
