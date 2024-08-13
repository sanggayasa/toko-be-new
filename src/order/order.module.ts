import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProduct, OrderDetail } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProduct]),
    TypeOrmModule.forFeature([OrderDetail]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
