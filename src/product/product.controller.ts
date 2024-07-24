import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageProductDto } from './dto/image-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { title } from 'process';
// import { Category } from 'src/category/entities/category.entity';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

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

    return {
      ...resultProduct,
      items: resultProduct.items.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.images[0],
        category_name: product.category.name,
      })),
    };
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
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Delete('delete')
  async uploadImage(@Body() imageProduct: ImageProductDto) {
    console.log(imageProduct.name);
    return await this.productService.deleteImage(
      './uploads/' + imageProduct.name,
    );
  }
}
