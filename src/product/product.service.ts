import {
  Injectable,
  NotFoundException,
  // ArgumentMetadata,
  // PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ILike,
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
// import { ListProduct } from './entities/list-product.entity';
import { unlink as unlinkAsync } from 'fs';
import { UpdateProductDto } from './dto/update-product.dto';
import { ErrorException } from '../utils/custom.exceptions';
import { responseMessage } from '../utils/constant';
// import { Prod } from '../users/users.service';
// import { ProductImageService } from '../product-image/product-image.service';
// import { getImage } from '../utils/function'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // @InjectRepository(ListProduct)
    // private readonly detailProductRepository: Repository<ListProduct>,
    // private productImageService: ProductImageService,
  ) {}

  private context: string = 'product';

  async paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
    return paginate<Product>(this.productRepository, options);
  }
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.insert({
      ...createProductDto,
    });
  }

  async findBy(
    page,
    limit,
    title,
    description,
    category_id,
    price,
    discount,
    priceMin,
    priceMax,
  ) {
    // const productImage = await this.productImageService.getImage(username);
    // let price: any;
    if (!price) {
      price = null;
    }

    if (priceMin && priceMax) {
      price = Between(priceMin, priceMax);
    } else if (priceMax) {
      price = LessThanOrEqual(priceMax);
    } else if (priceMin) {
      price = MoreThanOrEqual(priceMin);
    }

    // let discount: any;
    if (discount) {
      discount = MoreThanOrEqual(discount);
    }
    // try {
    // const page: number = 1;
    // const limit: number = 10;
    console.log('page', page);
    console.log('price', price);
    const data = await paginate(
      this.productRepository,
      { page, limit },
      {
        where: [
          {
            title: ILike(`%${title}%`),
            price: price,
            description: ILike(`%${description}%`),
          },
          // {
          //   discount: discount,
          // },
        ],
        select: ['title', 'description', 'images', 'id', 'price'],
        relations: ['category'],
        // order: { created_at: 'DESC' },
      },
    );

    // const data = await this.productRepository.find({
    //   where: [
    //     {
    //       title: ILike(`%${createProductDto.title}%`),
    //       price: price,
    //       description: ILike(`%${createProductDto.description}%`),
    //     },
    //     {
    //       discount: discount,
    //     },
    //   ],
    //   select: ['title', 'description', 'images', 'id', 'price'],
    //   relations: ['category'],
    // });
    console.log();
    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
    // } catch (err) {
    //   console.log('err', err);
    // }
  }

  async findOne(id: string) {
    const data = await this.productRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const checkIsDataExist = await this.productRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    return await this.productRepository.update(id, {
      ...updateProductDto,
    });
  }

  async updateImage(id: string, fileName: string) {
    console.log('jaln inii');
    const getImage = await this.productRepository.findOne({
      where: { id },
    });

    console.log(getImage.images);
    return await this.productRepository.update(id, {
      // ...createProductDto,
      // id: id,
      // name: fileName,
      images: [fileName],
    });
  }

  async deleteImage(filePath: string) {
    try {
      let status: string;
      await unlinkAsync(filePath, (err) => {
        if (err) {
          console.log('errorss');
          status = 'failed';
        } else {
          status = 'success';
        }
      });

      console.log(status);
      return { status: status };
    } catch (error) {
      return { status: 'failed', message: error };
    }
  }

  async remove(id: string) {
    const checkIsDataExist = await this.productRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    await this.productRepository.update(id, {
      updated_by: 'sangga',
    });
    return await this.productRepository.softDelete({ id });
    // return true;
  }
}
