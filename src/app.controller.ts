import { changeAddressToCoordinate } from './utils/geolocationApi';
import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';
const posts = [
  {
    id: 1,
    userId: 1,
    category: '치킨',
    posts: {
      title: '제목1',
      describe: 'test1',
    },
    addressKo: '강원도 원주시 상지대길 84',
  },
  {
    id: 2,
    userId: 2,
    category: '치킨',

    posts: {
      title: '제목2',
      describe: 'test2',
    },
    addressKo: '강원도 원주시 우산동 808-3',
  },
  {
    id: 3,
    userId: 3,
    category: '치킨',

    posts: {
      title: '제목3',
      describe: 'test3',
    },
    addressKo: '상지대학교 민주관',
  },
];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    await Promise.all(
      posts.map(async (post, index) => {
        const { results } = await changeAddressToCoordinate(post.addressKo);
        const { location } = results[0].geometry;
        posts[index] = { ...post, ...location };
      }),
    );
    return posts;
  }
}
