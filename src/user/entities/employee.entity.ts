import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Employee {
  @PrimaryColumn({ type: 'text', name: 'userId' })
  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // we use a type attribute, because it is disjoint
  @Column({ type: 'smallint' })
  type: number;

  @Column({ type: 'float64' })
  salary: number;

  @Column({ type: 'text', unique: true })
  company_phone: string;

  @Column({ type: 'text', unique: true })
  company_email: string;
}
