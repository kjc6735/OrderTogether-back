import { Category } from './category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

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
}
