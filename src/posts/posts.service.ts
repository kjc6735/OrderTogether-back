import {
  CreatePostRequestDto,
  CreatePostResponseDto,
} from './dtos/create.post.dto';
import { Store } from './../entities/store.entity';
import { Post } from './../entities/post.entity';
import { Category } from './../entities/category.entity';
import { User } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(
    user,
    { storeId, title, describe, addressKo }: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    console.log('tetest');
    try {
      const isStore = await this.storeRepository.findOne({
        where: { id: storeId },
      });
      if (!isStore) {
        return {
          success: false,
          message: '존재하지 않는 스토어입니다.',
        };
      }
      const post = new Post();

      post.userId = user.id;
      post.storeId = isStore.id;
      post.title = title;
      post.describe = describe;
      post.addressKo = addressKo;
      console.log(post);
      await this.postRepository.save(post);
      return {
        success: true,
        message: '게시글 작성 성공',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '게시글 작성 실패',
      };
    }
  }

  async delete(user, postId) {
    console.log('opostid is', postId);
    try {
      const isOwner = await this.postRepository.findOne({
        where: {
          id: postId,
        },
      });
      if (!isOwner)
        return {
          success: false,
          message: '존재하지 않는 게시글입니다.',
        };
      if (user.id !== isOwner.userId)
        return {
          success: false,
          message: '게시글의 소유자가 아닙니다.',
        };
      await this.postRepository.delete(postId);
      return {
        success: true,
        message: '게시글 삭제 성공',
      };
    } catch (e) {
      return {
        success: false,
        message: '게시글 삭제 실패',
      };
    }
  }

  async update(userId, postId, { title, describe }) {
    try {
      const isOwner = await this.postRepository.findOne({
        where: {
          id: postId,
        },
      });
      if (!isOwner)
        return {
          success: false,
          message: '존재하지 않는 게시글입니다.',
        };
      if (userId !== isOwner)
        return {
          success: false,
          message: '게시글의 소유자가 아닙니다.',
        };
      isOwner.title = title;
      isOwner.describe = describe;
      await this.postRepository.save(isOwner);
      return {
        success: true,
        message: '게시글 업데이트 성공',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '게시글 업데이트 실패',
      };
    }
  }
  async getPost(postId) {
    try {
      const post = await this.postRepository.findOne(postId);
      if (!post)
        return {
          success: false,
          message: '해당 게시글이 존재하지 않습니다.',
        };
      return post;
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '에러 발생',
      };
    }
  }
  async getPostsFilteredByStoreId(storeId) {
    try {
      const post = await this.postRepository.find({
        where: {
          storeId: storeId,
        },
      });
      return post;
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '조회하는 도중 에러가 발생하였습니다.',
      };
    }
  }

  async getPosts() {
    try {
      console.log('posts');
      const posts = await this.postRepository.find();

      return posts ?? null;
    } catch (e) {
      return {
        success: false,
        message: 'error',
      };
    }
  }

  async getMyPosts(user) {
    const posts = await this.postRepository.find({
      where: {
        userId: user.id,
      },
    });
    console.log('posts :: ', posts);
    return posts;
  }
}
