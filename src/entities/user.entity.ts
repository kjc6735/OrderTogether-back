import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  IsNull,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(5)
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
  @Column('varchar', { nullable: false })
  addressEn: string;

  @Column('varchar', { nullable: true })
  detail?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
