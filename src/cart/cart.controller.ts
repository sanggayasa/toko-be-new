import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  ParseUUIDPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartService } from './cart.service';
import { ResponseMessage } from '../utils/decorator/response.decorator';
import { responseMessage } from '../utils/constant';
import { UpdateCartDto } from './dto/update-cart.dto';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('')
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('/list')
  findByFilter(@Body() createCartDto: CreateCartDto) {
    return this.cartService.findBy(createCartDto);
  }

  @Get(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cartService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(responseMessage.SUCCESS_UPDATE)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ResponseMessage(responseMessage.SUCCESS_DELETE)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cartService.remove(id);
  }
}
