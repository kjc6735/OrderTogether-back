import { CategoryUpdateRequestDto } from './dtos/cateogry.update.dto';
import { Store } from './../entities/store.entity';
import { Category } from './../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async getCategpries() {
    return this.categoryRepository.find() ?? null;
  }

  async getStoresByCategoryId(id) {
    return this.categoryRepository.find(id) ?? null;
  }

  async updateCategory(id, categoryUpdateRequestDto: CategoryUpdateRequestDto) {
    try {
      let category = await this.categoryRepository.findOne(id);
      if (!category) {
        return {
          success: false,
          message: '존재하지 않는 카테고리입니다.',
        };
      }
      category = { ...category, ...categoryUpdateRequestDto };
      await this.categoryRepository.save(category);
    } catch (e) {
      return {
        success: false,
        message: '카테고리 업데이트에 실패했습니다.',
      };
    }
  }
  async createCategory(name) {
    const category = this.categoryRepository.findOne({
      where: name,
    });
  }
}
