import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column({ default: 0 })
  qty: number;

  @Column()
  created_by: string;

  @Column()
  update_by: string;
}
