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

  @Get('/user/me')
  getMyPost(@User() user) {
    console.log('c');
    return this.postsService.getMyPosts(user);
  }

  @Get('')
  getPosts() {
    console.log('a');
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPost(@Param() id) {
    console.log('b');

    return this.postsService.getPost(id);
  }

  @Post('')
  createPost(@User() user, @Body() createPostRequestDto: CreatePostRequestDto) {
    console.log(createPostRequestDto);
    this.postsService.create(user, createPostRequestDto);
  }

  @Put(':id')
  update(@Param() id, @User() user, @Body() body) {
    return this.postsService.update(user, id, body);
  }

  @Delete(':id')
  delete(@Param('id') id, @User() user) {
    console.log('delete');
    return this.postsService.delete(user, id);
  }
}
