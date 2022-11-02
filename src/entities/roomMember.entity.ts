import { Room } from './room.entity';
import { User } from './user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoomMember {
  /*
   @ManyToOne(() => Workspaces, (workspaces) => workspaces.DMs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  Workspace: Workspaces;
  */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Room, (room) => room.members)
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  room: Room;
}
