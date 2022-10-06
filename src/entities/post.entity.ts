import { changeAddressToCoordinate } from './../utils/geolocationApi';
import { User } from './user.entity';
import { Store } from './store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  RelationId,
  BeforeInsert,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  describe: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column('double', { nullable: true })
  latitude: number;
  @Column('double', { nullable: true })
  longitude: number;

  @RelationId((post: Post) => post.user)
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => Store, (store) => store.posts, { nullable: false })
  store: Store;

  @RelationId((post: Post) => post.store)
  @Column({ nullable: false })
  storeId: number;

  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', { nullable: false })
  addressKo: string;

  @MaxLength(100)
  @Column('varchar', { default: null })
  addressEn: string;

  @Column('varchar', { nullable: true })
  detail?: string;

  @BeforeInsert()
  async addressToCoordinate() {
    const data = await changeAddressToCoordinate(this.addressKo);
    const { geometry } = data.results[0];

    const { location } = geometry;
    const { lat, lng } = location;
    this.latitude = lat;
    this.longitude = lng;
  }
}
