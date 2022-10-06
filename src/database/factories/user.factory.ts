import { User } from './../../entities/user.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { randomAddress } from '../utils/addressGenerate';

define(User, () => {
  faker.locale = 'ko';
  const name = faker.name.firstName();
  const address = randomAddress();
  return User.create({
    userId: name,
    displayName: name,
    password: '1234',
    zonecode: '1',
    addressKo: address,
    addressEn: address,
  });
});
