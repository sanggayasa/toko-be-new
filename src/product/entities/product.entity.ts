import { Category } from 'src/category/entities/category.entity';
import { GlobalEntity } from 'src/global.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
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

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar', length: 16 })
  discount: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ type: 'integer' })
  weight: number;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // @OneToMany(() => ProductImage, (image) => image.product_id)
  // images: ProductImage[];
}
