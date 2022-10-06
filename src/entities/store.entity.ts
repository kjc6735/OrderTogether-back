import { Category } from './category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Post } from './post.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Column('varchar', { nullable: false })
  name: string;

  @IsNotEmpty()
  @ManyToOne(() => Category, (category) => category.stores, { nullable: false })
  category: Category;

  @Column({ nullable: false })
  @RelationId((store: Store) => store.category)
  categoryId: number;

  @OneToMany(() => Post, (post) => post.store)
  posts: Post[];
}
