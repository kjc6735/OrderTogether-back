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
import { Room } from './room.entity';

@Entity()
export class DM {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  mesage: string;

  @ManyToOne(() => Room, (room) => room.dms)
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  room: Room;

  @ManyToOne(() => User, (user) => user.dms)
  @JoinColumn([{ name: 'sender', referencedColumnName: 'id' }])
  sender: User;

  @CreateDateColumn()
  createdAt: Date;
}
