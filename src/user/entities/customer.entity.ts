import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export abstract class Customer {
  @PrimaryColumn({ type: 'text', name: 'id' })
  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;
}
