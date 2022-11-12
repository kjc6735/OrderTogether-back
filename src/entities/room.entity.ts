import { RoomMember } from './roomMember.entity';
import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DM } from './dm.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RoomMember, (roomMember) => roomMember.room)
  members: RoomMember[];

  @OneToMany(() => DM, (dm) => dm.room)
  dms: DM[];
}
