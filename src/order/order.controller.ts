import {
  Controller,
  Post,
  Body,
  // Get,
  // Delete,
  // ParseUUIDPipe,
  // Param,
  // Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { ResponseMessage } from '../utils/decorator/response.decorator';
import { responseMessage } from '../utils/constant';
// import { UpdateCartDto } from './dto/update-order.dto';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  // @Post('/list')
  // findByFilter(@Body() createCartDto: CreateOrderDto) {
  //   return this.cartService.findBy(createCartDto);
  // }

  // @Get(':id')
  // @ResponseMessage(responseMessage.SUCCESS)
  // findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.cartService.findOne(id);
  // }

  // @Put(':id')
  // @ResponseMessage(responseMessage.SUCCESS_UPDATE)
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateCartDto: UpdateCartDto,
  // ) {
  //   return this.cartService.update(id, updateCartDto);
  // }

  // @Delete(':id')
  // @ResponseMessage(responseMessage.SUCCESS_DELETE)
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.cartService.remove(id);
  // }
}
