import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
import { unlink as unlinkAsync } from 'fs';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ErrorException } from 'src/utils/custom.exceptions';
import { responseMessage } from 'src/utils/constant';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  private context: string = 'cart';
  async create(createCartDto: CreateCartDto) {
    const checkDuplicateProduct = await this.cartRepository.findBy({
      product_id: createCartDto.product_id,
      user_id: createCartDto.user_id,
      status: createCartDto.status,
    });

    if (checkDuplicateProduct.length > 0) {
      return 'success';
    }

    return await this.cartRepository.insert({
      ...createCartDto,
    });
  }

  async findBy(createCartDto: CreateCartDto) {
    const data = await this.cartRepository.find({
      where: { user_id: createCartDto.user_id, status: createCartDto.status },
    });

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async findOne(id: string) {
    const data = await this.cartRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const checkIsDataExist = await this.cartRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    return await this.cartRepository.update(id, {
      ...updateCartDto,
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
    const checkIsDataExist = await this.cartRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    await this.cartRepository.update(id, {
      updated_by: 'sangga',
    });
    return await this.cartRepository.softDelete({ id });
    // return true;
  }
}
