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
import { unlink as unlinkAsync } from 'fs';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage } from './entities/product-image.entity';
import { ErrorException } from '../../src/utils/custom.exceptions';
import { responseMessage } from '../../src/utils/constant';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  private context: string = 'product';

  async paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
    return paginate<Product>(this.productRepository, options);
  }
  async create(createProductDto: CreateProductDto, image: any) {
    const idProduct = await this.productRepository.insert({
      ...createProductDto,
    });

    image.map(async (item) => {
      await this.productImageRepository.insert({
        product_id: idProduct.identifiers[0].id,
        url: item,
      });
    });

    return idProduct;
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
    const productList = await paginate(
      this.productRepository,
      { page, limit },
      {
        where: [
          {
            title: ILike(`%${title}%`),
            price: price,
            description: ILike(`%${description}%`),
          },
        ],
        select: ['title', 'description', 'id', 'price'],
        relations: ['category'],
      },
    );

    if (!productList) {
      throw new NotFoundException(this.context);
    }

    const productWithGambar = await Promise.all(
      productList.items.map(async (item) => {
        const images = await this.productImageRepository.find({
          select: ['url'],
          where: { product_id: item.id },
        });

        if (!images) {
          throw new NotFoundException(this.context);
        }
        console.log('imagesssss', images);
        return {
          ...item,
          images: images,
          category: {
            name: item.category.name,
            id: item.category.id,
          },
        };
      }),
    );
    const remapListProduct = {
      ...productList,
      items: productWithGambar,
    };

    return remapListProduct;
  }

  async findOne(id: string) {
    const data = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!data) {
      throw new NotFoundException(this.context);
    }

    const images = await this.productImageRepository.find({
      select: ['url'],
      where: { product_id: id },
    });

    if (!images) {
      throw new NotFoundException(this.context);
    }

    const detailProduct = {
      ...data,
      images: images,
      category: {
        name: data.category.name,
        id: data.category.id,
      }
    };
    // data.images = images;
    return detailProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const checkIsDataExist = await this.productRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
      // return {
      //   message: 'data not found',
      // };
    }

    return await this.productRepository.update(id, {
      ...updateProductDto,
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
      // throw new ErrorException(responseMessage.NOT_FOUND);
    }

    await this.productRepository.update(id, {
      updated_by: 'sangga',
    });
    return await this.productRepository.softDelete({ id });
    // return true;
  }
}
