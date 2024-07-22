import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { HashService } from '../hash/hash.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private hashService: HashService,
  ) {}

  async changeStatusPayment(createPaymentDto: CreatePaymentDto) {
    console.log('dataCheckout', createPaymentDto);

    const signature = this.hashService
      .createMD5Hash(
        '16319b472f6438f74626271aef912ac9' +
          createPaymentDto.unique_code +
          createPaymentDto.service +
          createPaymentDto.amount +
          +'1800' +
          'NewTransaction',
      )
      .toString();

    console.log('signature', signature);

    const formdata = new FormData();
    formdata.append('key', '16319b472f6438f74626271aef912ac9');
    formdata.append('request', 'new');
    formdata.append('unique_code', createPaymentDto.unique_code);
    formdata.append('service', createPaymentDto.service);
    formdata.append('amount', createPaymentDto.amount);
    formdata.append('note', createPaymentDto.note);
    formdata.append('valid_time', '1800');
    formdata.append('type_fee', createPaymentDto.type_fee);
    formdata.append('signature', signature);

    console.log(formdata);
    const requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    await this.paymentRepository.insert({
      ...createPaymentDto,
      created_at: new Date(),
    });

    return await fetch('https://paydisini.co.id/api/', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.error(error));

    // return {
    //   success: 'true',
    // };
  }
}
