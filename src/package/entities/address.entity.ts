import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GeoAddress {
  @Index(['country', 'city', 'street', 'zipcode'], { unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  country: string;
  @Column({ nullable: false, type: 'text' })
  city: string;
  @Column({ nullable: false, type: 'text' })
  street: string;
  @Column({ nullable: false, type: 'text', unique: true })
  zipcode: string;
}
