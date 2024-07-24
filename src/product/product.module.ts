import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
// import { ListProduct } from './entities/list-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { ProductImage } from 'src/product-image/entities/product-image.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    // TypeOrmModule.forFeature([ListProduct]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Adjust the directory path for uploads
        filename: function (req, file, cb) {
          // const uniqueSuffix =
          //   Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + file.originalname);
        },
      }),
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
