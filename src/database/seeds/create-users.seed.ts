import { User } from './../../entities/user.entity';
import { Connection } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Factory, Seeder } from 'typeorm-seeding';
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 1,
          userId: 'jaechan1',
          displayName: '재찬1',
          password: await bcrypt.hash('1234', 11),
          zonecode: '1234',
          addressKo: '강원도 원주시 상지대길 84',
          addressEn: 'test',
          latitude: 1,
          longitude: 1,
        },
        {
          id: 2,
          userId: 'jaechan2',
          displayName: '재찬2',
          password: await bcrypt.hash('1234', 11),
          zonecode: '1234',
          addressKo: '강원도 원주시 우산동 808-3',
          addressEn: 'test',
          latitude: 1,
          longitude: 1,
        },
        {
          id: 3,
          userId: 'jaechan3',
          displayName: '재찬3',
          password: await bcrypt.hash('1234', 11),
          zonecode: '1234',
          addressKo: '상지대학교 민주관',
          addressEn: 'test',
          latitude: 1,
          longitude: 1,
        },
      ])
      .execute();
  }
}
