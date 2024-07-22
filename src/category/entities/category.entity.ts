import { GlobalEntity } from 'src/global.entity';
import { Product } from 'src/product/entities/product.entity';
// import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  // OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity('category')
export class Category extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
  // @OneToOne(() => Product, (product) => product.tesid)
  // product: Product;
}
