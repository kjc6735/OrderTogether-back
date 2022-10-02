import { changeAddressToCoordinate } from './../../utils/geolocationApi';
import { User } from './../../entities/user.entity';
import { define } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

define(User, () => {
  const user = new User();
  user.userId = `${prefix.userId}${1}`;
  user.displayName = faker.
  user.password = 'test';
  user.zonecode = 'test';
  user.addressEn = 'test';
  user.addressKo = 'test';
  user.latitude = 1;
  user.longitude = 1;
  return user;
});
