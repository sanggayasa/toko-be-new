import { GlobalEntity } from 'src/global.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('cart')
export class Cart extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  product_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
}
