import { User } from './user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class DM {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @ManyToOne(() => User, (users) => users.dm, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  sender: User;

  @ManyToOne(() => User, (users) => users.dm2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  receiver: User;

  @ManyToOne(() => Room, (room) => room.dms)
  room: Room;
}
