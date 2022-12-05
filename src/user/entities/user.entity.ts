import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; // the national id

  @Column({ type: 'text' })
  Fname: string;

  @Column({ type: 'varchar', length: '1' })
  Minit: string;

  @Column({ type: 'text' })
  Lname: string;
}
