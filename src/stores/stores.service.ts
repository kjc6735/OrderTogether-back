import { StoreUpdateRequestDto } from './dtos/store.update.dto';
import { Category } from './../entities/category.entity';
import { CreateStoreRequestDto } from './dtos/create.store.dto';
import { Store } from './../entities/store.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAll() {
    return this.storeRepository.find();
  }

  async create({
    name: storeName,
    category: categoryId,
  }: CreateStoreRequestDto) {
    try {
      const isStore = await this.storeRepository.findOne({
        where: { name: storeName },
      });
      if (isStore) {
        return {
          success: false,
          message: '이미 등록된 스토어 이름입니다.',
        };
      }
      const isCategory = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!isCategory) {
        return {
          success: false,
          message: '없는 카테고리입니다.',
        };
      }
      const newStore = new Store();
      newStore.name = storeName;
      newStore.category = isCategory;

      await this.storeRepository.save(newStore);
      return {
        success: true,
        message: '스토어 등록에 성공하였습니다.',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '스토어 등록에 실패하였습니다.',
      };
    }
  }

  async update(id: number, { name, categoryId }: StoreUpdateRequestDto) {
    try {
      const isStore = await this.storeRepository.findOne({
        where: {
          id,
        },
      });
      if (!isStore) {
        return {
          success: false,
          message: '존재하지 않는 스토어입니다.',
        };
      }
      const isCategory = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!isCategory) {
        return {
          success: false,
          message: '존재하지 않는 카테고리입니다.',
        };
      }
      isStore.category = isCategory;
      isStore.name = name;
      await this.storeRepository.save(isStore);
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '스토어 업데이트 실패',
      };
    }
  }
  async remove(id: number) {
    return this.storeRepository.delete(id);
  }
}
