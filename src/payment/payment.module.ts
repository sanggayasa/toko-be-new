import { Module } from '@nestjs/common';
// import { ChatGateway } from './payment.gateway';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment, PaymentList } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '../hash/hash.service';

@Module({
  imports: [
    // ChatGateway,
    TypeOrmModule.forFeature([Payment]),
    TypeOrmModule.forFeature([PaymentList]),
  ],
  providers: [PaymentService, HashService],
  controllers: [PaymentController],
})
export class PaymentModule {}
