import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
  Param,
  Put,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ResponseMessage } from 'src/utils/decorator/response.decorator';
import { responseMessage } from 'src/utils/constant';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageProductDto } from './dto/image-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v2 as cloudinary } from 'cloudinary';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('all')
  async findByFilter(
    // @Body() createProductDto: CreateProductDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('title') title: string = '',
    @Query('description') description: string = '',
    // @Query('category_id', new DefaultValuePipe(''), ParseUUIDPipe)
    category_id: string = '',
    @Query('price', new DefaultValuePipe(0), ParseIntPipe) price: number = 0,
    @Query('discount', new DefaultValuePipe(1), ParseIntPipe)
    discount: number = 1,
    @Query('priceMin', new DefaultValuePipe(0), ParseIntPipe)
    priceMin: number = 0,
    @Query('priceMax', new DefaultValuePipe(0), ParseIntPipe)
    priceMax: number = 0,
  ) {
    const resultProduct = await this.productService.findBy(
      page,
      limit,
      title,
      description,
      category_id,
      price,
      discount,
      priceMin,
      priceMax,
    );
    return resultProduct;
    // return {
    //   ...resultProduct,
    //   items: resultProduct.items.map((product) => ({
    //     id: product.id,
    //     title: product.title,
    //     description: product.description,
    //     price: product.price,
    //     // image: product.images[0],
    //     category_name: product.category.name,
    //   })),
    // };
  }

  @Get(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(responseMessage.SUCCESS_UPDATE)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage(responseMessage.SUCCESS_DELETE)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 2))
  async uploadFile(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createProductDto: CreateProductDto,
  ) {
    cloudinary.config({
      cloud_name: 'dbuvg7afe',
      api_key: '332531932338268',
      api_secret: 'B31KYmBvsslVaNhwOKwbBUAakjk', // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const uploadImages = file.map(async (itemFoto) => {
      console.log('jalan');
      const uploadResult = cloudinary.uploader
        .upload(itemFoto.path, {
          public_id: 'product-' + itemFoto.originalname,
        })
        .catch((error) => {
          console.log(error);
        });
      return uploadResult;
    });

    const detailImages = await Promise.all(uploadImages);
    const urlImages = detailImages.map((items: any) => {
      return items.secure_url;
    });

    return this.productService.create(createProductDto, urlImages);
  }

  @Delete('delete')
  async uploadImage(@Body() imageProduct: ImageProductDto) {
    console.log(imageProduct.name);
    return await this.productService.deleteImage(
      './uploads/' + imageProduct.name,
    );
  }
}
