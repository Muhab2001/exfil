import { Role } from 'src/auth/role.enum';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string; // the national id

<<<<<<< HEAD
  @Column({ type: 'text', nullable: false, unique: true })
=======
  @Column({ type: 'text', nullable: false })
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
  username: string;

  // we use a type attribute, because it is disjoint
  @Column({ type: 'smallint' })
  role: Role;

  @Column({ type: 'text', nullable: false })
  password: string;
}
