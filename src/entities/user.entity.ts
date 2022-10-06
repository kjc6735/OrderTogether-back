import { changeAddressToCoordinate } from './../utils/geolocationApi';
import { Room } from './room.entity';
import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  IsNull,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { DM } from './dm.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  static create({
    id = null,
    userId,
    displayName,
    password,
    zonecode = null,
    addressKo,
    addressEn = null,
    detail = null,
  }) {
    const user = new User();
    user.id = id;
    user.userId = userId;
    user.password = password;
    user.displayName = displayName;
    user.zonecode = zonecode ?? 'test';
    user.addressKo = addressKo;
    user.addressEn = addressEn;
    user.detail = detail;

    return user;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(2)
  @Column('varchar', { nullable: false })
  userId: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  @Column('varchar', { nullable: false })
  displayName: string;

  @IsNotEmpty()
  @Column('varchar', { nullable: false })
  password: string;

  @IsNotEmpty()
  @MaxLength(5)
  @MinLength(5)
  @Column('varchar', { nullable: false })
  zonecode: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', { nullable: false })
  addressKo: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', { default: null })
  addressEn: string;

  @Column('double', { nullable: true })
  latitude: number;
  @Column('double', { nullable: true })
  longitude: number;

  @Column('varchar', { nullable: true })
  detail?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => DM, (dm) => dm.sender)
  dm: DM[];

  @OneToMany(() => DM, (dm) => dm.receiver)
  dm2: DM[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 11);
  }

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
