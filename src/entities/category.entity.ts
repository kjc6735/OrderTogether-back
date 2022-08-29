import { Store } from './store.entity';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => Store, (store) => store.category)
  stores: Store[];
}
