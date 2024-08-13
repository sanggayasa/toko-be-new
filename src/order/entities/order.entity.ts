import { GlobalEntity } from 'src/global.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('order_product')
export class OrderProduct extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  product_id: string;

  @Column({ type: 'varchar', length: 255 })
  product_name: string;

  @Column({ type: 'integer' })
  qty: number;

  @Column({ type: 'integer' })
  total_price: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;
}

@Entity('order_detail')
export class OrderDetail extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  unique_code: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  shipping_cost_total: string;

  @Column({ type: 'integer' })
  total_price: number;

  @Column({ type: 'varchar', length: 50 })
  payment_type: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
}
