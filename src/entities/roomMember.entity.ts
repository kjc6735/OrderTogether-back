import { DM } from './dm.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class RoomMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Room, (room) => room.members)
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  room: Room;
}
