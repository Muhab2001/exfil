import { Entity } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Admin extends Employee {}
