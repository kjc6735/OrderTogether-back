import { User } from './user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class DM {
  @PrimaryColumn()
  id: number;
}
