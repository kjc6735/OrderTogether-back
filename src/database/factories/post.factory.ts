import { Post } from './../../entities/post.entity';
import { define } from 'typeorm-seeding';
import { Faker, faker } from '@faker-js/faker';
import { randomAddress } from '../utils/addressGenerate';

define(Post, (faker: Faker): Post => {
  const post = new Post();
  post.id = null;
  post.title = faker.random.word();
  post.describe = faker.lorem.paragraphs(5).replace("'", '');
  post.addressKo = randomAddress();
  return post;
});
