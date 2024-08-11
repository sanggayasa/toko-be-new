import { GlobalEntity } from 'src/global.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('product_image')
export class ProductImage extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  product_id: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  id_image: string;
}
