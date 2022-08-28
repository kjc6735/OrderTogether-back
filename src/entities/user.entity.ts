import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  zonecode: string;

  @Column()
  addressKo: string;

  @Column()
  addressEn: string;

  @Column()
  detail?: string;
}
