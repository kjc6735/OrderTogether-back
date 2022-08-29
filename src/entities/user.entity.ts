import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

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
}
