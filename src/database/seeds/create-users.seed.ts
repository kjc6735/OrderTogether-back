import { Post } from './../../entities/post.entity';
import { Store } from './../../entities/store.entity';
import { Category } from './../../entities/category.entity';
import { User } from './../../entities/user.entity';
import { Connection } from 'typeorm';

import { Factory, Seeder } from 'typeorm-seeding';
import { randomAddress } from '../utils/addressGenerate';
const category = ['치킨', '피자', '중국집'];
const store = [
  { id: 1, name: 'bbq', categoryId: 1 },
  { id: 2, name: '푸라닭', categoryId: 1 },
  { id: 3, name: '네네치킨', categoryId: 1 },
  { id: 4, name: '피자스쿨', categoryId: 2 },
  { id: 5, name: '피자집몰라', categoryId: 2 },
  { id: 6, name: '아무거나피자', categoryId: 2 },
  { id: 7, name: '칭칭차이나', categoryId: 3 },
  { id: 8, name: '황소반점', categoryId: 3 },
  { id: 9, name: '홍콩반점', categoryId: 3 },
];
const categoryDtata = category.map((item) => ({
  name: item,
}));
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // 쿼리 빌더, 쿼리 러너 등 엔티티를 사용하지 않는 데이터 저장은 beforInsert가 작동하지 않음..
    // 해결하기 위해 스태틱 함수 create를 만들어 사용
    // subscribe를 만들어도 된다고 한다. -> 사용해보기 전
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(categoryDtata)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values(store)
      .execute();
    await factory(User)().createMany(20);
    const users = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    const getStore = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .getMany();
    const uesrLength = users.length;
    const storeLength = getStore.length;
    let index = 1;
    await factory(Post)()
      .map(async (post: Post) => {
        post.userId = index;
        post.addressKo = randomAddress();
        post.storeId = (index % storeLength) + 1;
        index++;
        return post;
      })
      .createMany(users.length);
  }
}
