import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class TransportEvent {
  @PrimaryColumn({ type: 'text' })
  schedule_number: string;

  @Column({ type: 'int', nullable: false })
  type: number; //TODO: replace with an enum

  @ManyToMany(() => Location, {
    lazy: true,
  })
  @JoinTable()
  delviery_route: Promise<Location[]>;
}
