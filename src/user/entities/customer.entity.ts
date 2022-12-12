import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export abstract class Customer {
  @PrimaryColumn({ type: 'text' })
  userId: string;

  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;
}
