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
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  storeId: number;

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

  @OneToOne(() => Store, { nullable: false })
  @JoinColumn()
  store: Store;
}