import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EmployeType } from '../enums/employee-type.enum';
import { User } from './user.entity';

@Entity()
export abstract class Employee {
  @PrimaryColumn({ type: 'text', name: 'id' })
  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'float' })
  salary: number;

  @Column({ type: 'text', unique: true })
  company_phone: string;

  @Column({ type: 'text', unique: true })
  company_email: string;
}
