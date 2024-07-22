import { Category } from 'src/category/entities/category.entity';
import { GlobalEntity } from 'src/global.entity';
// import { ProductImage } from 'src/product-image/entities/product-image.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  // ManyToOne,
  // OneToOne,
  // JoinColumn,
  // ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { Category } from 'src/category/entities/category.entity';
@Entity('product')
export class Product extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'uuid' })
  category_id: string;

  // @Column({ type: 'uuid' })
  // tesidId: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar', length: 16 })
  discount: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ type: 'integer' })
  weight: number;

  @Column({ type: 'jsonb' })
  images: string[];

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // @ManyToOne(() => Category, (category) => category.products, {
  //   onDelete: 'SET NULL',
  // })
  // tesid: Category;
}
