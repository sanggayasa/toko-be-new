import {
  Injectable,
  // NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct, OrderDetail } from './entities/order.entity';
// import { unlink as unlinkAsync } from 'fs';
// import { UpdateCartDto } from './dto/update-order.dto';
// import { ErrorException } from '../utils/custom.exceptions';
// import { responseMessage } from 'src/utils/constant';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  private context: string = 'cart';
  async create(createOrderDto: CreateOrderDto) {
    // const checkDuplicateProduct = await this.cartRepository.findBy({
    //   product_id: createOrderDto.product_id,
    //   user_id: createOrderDto.user_id,
    //   status: createOrderDto.status,
    // });

    // if (checkDuplicateProduct.length > 0) {
    //   return 'data duplicate';
    // }
    // console.log("====", createCartDto.url_image)
    const productList = createOrderDto.product_list.map((item) => {
      return {
        product_id: item.id,
        product_name: item.title,
        qty: item.quantity,
        total_price: item.totalPrice,
        image: item.image,
      };
    });

    const productDetail = {
      user_id: createOrderDto.user_id,
      unique_code: createOrderDto.unique_code,
      payment_type: createOrderDto.payment_type,
      address_id: createOrderDto.address_id,
    };

    console.log('product_list', productDetail);
    await this.orderProductRepository.insert(productList);
    return await this.orderDetailRepository.insert(productDetail);
  }

  // async findBy(createCartDto: CreateOrderDto) {
  //   const data = await this.cartRepository.find({
  //     where: { user_id: createCartDto.user_id, status: createCartDto.status },
  //   });

  //   if (!data) {
  //     throw new NotFoundException(this.context);
  //   }

  //   return data;
  // }

  // async findOne(id: string) {
  //   const data = await this.cartRepository.findOne({
  //     where: { id },
  //   });

  //   if (!data) {
  //     throw new NotFoundException(this.context);
  //   }

  //   return data;
  // }

  // async update(id: string, updateCartDto: UpdateCartDto) {
  //   const checkIsDataExist = await this.cartRepository.findOneBy({ id });

  //   if (!checkIsDataExist) {
  //     throw new ErrorException(responseMessage.NOT_FOUND);
  //   }

  //   return await this.cartRepository.update(id, {
  //     ...updateCartDto,
  //   });
  // }

  // async deleteImage(filePath: string) {
  //   try {
  //     let status: string;
  //     await unlinkAsync(filePath, (err) => {
  //       if (err) {
  //         console.log('errorss');
  //         status = 'failed';
  //       } else {
  //         status = 'success';
  //       }
  //     });

  //     console.log(status);
  //     return { status: status };
  //   } catch (error) {
  //     return { status: 'failed', message: error };
  //   }
  // }

  // async remove(id: string) {
  //   const checkIsDataExist = await this.cartRepository.findOneBy({ id });

  //   if (!checkIsDataExist) {
  //     throw new ErrorException(responseMessage.NOT_FOUND);
  //   }

  //   await this.cartRepository.update(id, {
  //     updated_by: 'sangga',
  //   });
  //   return await this.cartRepository.softDelete({ id });
  //   // return true;
  // }
}
