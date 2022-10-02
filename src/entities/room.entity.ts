import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DM } from './dm.entity';

@Entity()
export class Room {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => DM, (dm) => dm.room)
  dms: DM[];
}
