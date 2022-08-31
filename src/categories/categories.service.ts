import { CategoryUpdateRequestDto } from './dtos/cateogry.update.dto';
import { Category } from './../entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoryRepository.find() ?? null;
  }

  async getStoresByCategoryId(id) {
    return this.categoryRepository.find({
      where: { id },
      relations: ['stores'],
    });
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
    try {
      const category = await this.categoryRepository.findOne({
        where: { name },
      });
      if (category) {
        return {
          success: false,
          message: '이미 존재하는 카테고리입니다.',
        };
      }
      const newCategory = new Category();
      newCategory.name = name;
      await this.categoryRepository.save(newCategory);
      return {
        success: true,
        message: '카테고리 생성 성공',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '카테고리 생성 실패',
      };
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category)
        return {
          success: false,
          message: '존재하지 않는 카테고리입니다.',
        };
      await this.categoryRepository.delete(id);
      return {
        success: true,
        message: '카테고리 삭제 성공',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '카테고리 삭제 실패',
      };
    }
  }
}
