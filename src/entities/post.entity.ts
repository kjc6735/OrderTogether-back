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
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  describe: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @RelationId((post: Post) => post.user)
  userId: number;

  @ManyToOne(() => Store, (store) => store.posts)
  store: Store;

  @RelationId((post: Post) => post.store)
  storeId: number;

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
}
