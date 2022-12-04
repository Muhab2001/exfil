import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export abstract class Customer {
  @PrimaryColumn({ type: 'text', name: 'userId' })
  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column({ type: 'text', unique: true })
  email: string;
}
