import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductImage]),
    MulterModule.register({
      storage: diskStorage({
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + file.originalname);
        },
      }),
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
