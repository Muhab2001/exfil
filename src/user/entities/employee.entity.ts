import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EmployeType } from '../enums/employee-type.enum';
import { User } from './user.entity';

@Entity()
export class Employee {
  @PrimaryColumn({ type: 'text', name: 'id' })
  @OneToOne(() => User, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // we use a type attribute, because it is disjoint
  @Column({ type: 'smallint' })
  type: EmployeType;

  @Column({ type: 'float' })
  salary: number;

  @Column({ type: 'text', unique: true })
  company_phone: string;

  @Column({ type: 'text', unique: true })
  company_email: string;
}
