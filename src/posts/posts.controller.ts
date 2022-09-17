import { CreatePostRequestDto } from './dtos/create.post.dto';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get(':id')
  getPost(@Param() id) {
    return this.postsService.getPost(id);
  }

  @Get('')
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post('')
  createPost(@User() user, @Body() createPostRequestDto: CreatePostRequestDto) {
    this.postsService.create(user, createPostRequestDto);
  }

  @Put(':id')
  update(@Param() id, @User() user, @Body() body) {
    return this.postsService.update(user, id, body);
  }

  @Delete(':id')
  delete(@Param() id, @User() user) {
    return this.postsService.delete(user, id);
  }
}
