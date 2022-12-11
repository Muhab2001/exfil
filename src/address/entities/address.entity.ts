import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  country: string;
  @Column({ nullable: false, type: 'text' })
  city: string;
  @Column({ nullable: false, type: 'text' })
  street: string;
  @Column({ nullable: false, type: 'text' })
  zip_code: string;
}
