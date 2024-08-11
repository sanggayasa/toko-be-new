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
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
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

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('file', 5))
  @ResponseMessage(responseMessage.SUCCESS_UPDATE)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    let updateImageCloud = [];
    if (file.length > 0) {
      const images = JSON.parse(updateProductDto.images);
      cloudinary.config({
        cloud_name: process.env.NEST_PUBLIC_CLOUD_NAME,
        api_key: process.env.NEST_PUBLIC_CLOUD_APIKEY,
        api_secret: process.env.NEST_PUBLIC_CLOUD_SECRET, // Click 'View Credentials' below to copy your API secret
      });
      console.log(file);
      const responseImages = images.map(async (item) => {
        await cloudinary.uploader.destroy(item.id_image_cloud);

        // if(item.name === file.name){

        // }
        // Upload an image
        const uploadImages = file.map(async (itemFoto) => {
          if (itemFoto.originalname === item.name) {
            console.log(itemFoto.originalname, item.name);
            const uploadResult = cloudinary.uploader
              .upload(itemFoto.path, {
                public_id:
                  'product-' + new Date().getTime() + itemFoto.originalname,
              })
              .catch((error) => {
                console.log(error);
              });
            return uploadResult;
          }
        });

        const detailImages = await Promise.all(uploadImages);
        const filterImages = detailImages.filter(
          (image) => image !== undefined,
        );
        console.log('filter imagessss,', filterImages);
        // const urlImages = (filterImages[0] as UploadApiResponse).secure_url;

        return {
          ...item,
          url: (filterImages[0] as UploadApiResponse).secure_url,
          id_image_cloud: (filterImages[0] as UploadApiResponse).public_id,
        };
      });

      console.log('responseImages', await Promise.all(responseImages));
      updateImageCloud = await Promise.all(responseImages);
    }
    // console.log('updateedddd', updateImageCloud);
    delete updateProductDto.images;
    return this.productService.update(id, updateProductDto, updateImageCloud);
  }

  @Delete(':id')
  @ResponseMessage(responseMessage.SUCCESS_DELETE)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file', 5))
  async uploadFile(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createProductDto: CreateProductDto,
  ) {
    console.log(createProductDto);
    // return true;
    cloudinary.config({
      cloud_name: process.env.NEST_PUBLIC_CLOUD_NAME,
      api_key: process.env.NEST_PUBLIC_CLOUD_APIKEY,
      api_secret: process.env.NEST_PUBLIC_CLOUD_SECRET, // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const uploadImages = file.map(async (itemFoto) => {
      const uploadResult = cloudinary.uploader
        .upload(itemFoto.path, {
          public_id: 'product-' + new Date().getTime() + itemFoto.originalname,
        })
        .catch((error) => {
          console.log(error);
        });
      return uploadResult;
    });

    const detailImages = await Promise.all(uploadImages);
    console.log(detailImages);
    const urlImages = detailImages.map((items: any) => {
      return {
        id: items.public_id,
        url: items.secure_url,
      };
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
