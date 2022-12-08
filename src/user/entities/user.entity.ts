import { Role } from 'src/auth/role.enum';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; // the national id

  @Column({ type: 'text', nullable: false })
  username: string;

  // we use a type attribute, because it is disjoint
  @Column({ type: 'smallint' })
  role: Role;

  @Column({ type: 'text', nullable: false })
  password: string;
}
