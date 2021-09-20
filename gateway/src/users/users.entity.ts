import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  // @PrimaryGeneratedColumn()
  // id: number;
  //
  // @Column()
  // title: string;
  //
  // @Column()
  // image: string;
  //
  // @Column({ default: 0 })
  // likes: number;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid:string;

    @Column()
    displayName: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    status: number;
}
