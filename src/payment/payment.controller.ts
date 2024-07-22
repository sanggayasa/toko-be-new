import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';
import { IgnoreResponseInterceptor } from 'src/utils/decorator/ignore-response.decorator';
// import { ResponseMessage } from 'src/utils/decorator/response.decorator';
// import { responseMessage } from 'src/utils/constant';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('callback')
  @IgnoreResponseInterceptor()
  changeStatusPayment(@Body() createPaymentDto: CreatePaymentDto) {
    // return {
    //   status: 'success',
    // };

    return this.paymentService.changeStatusPayment(createPaymentDto);
  }

  @Post('transaction')
  @IgnoreResponseInterceptor()
  createNewTransaction(@Body() createPaymentDto: CreatePaymentDto) {
    // return {
    //   status: 'success',
    // };
    console.log('dataaa', createPaymentDto);
    return this.paymentService.changeStatusPayment(createPaymentDto);
  }
}
