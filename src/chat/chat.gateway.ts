import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment } from '../payment/entities/payment.entity';
// import { ChatService } from './chat.service'; // Layanan untuk menyimpan data

@WebSocketGateway(8082, { cors: '*' })
// @Injectable()
export class ChatGateway {
  // constructor(
  // @InjectRepository(Payment)
  // private readonly chatRepository: Repository<Payment>,
  // ) {}
  // constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: any) {
    // await this.chatService.saveMessage(message);
    // console.log('message', message);
    this.server.emit('message', message);
  }

  async sendToAllClients(data: any) {
    // const resultPayment = await this.chatRepository.find({
    //   where: [{ unique_code: data.unique_code }],
    // });

    // console.log(data);
    // if (!resultPayment) {
    //   throw new NotFoundException('payment');
    // }

    const message = {
      sender_id: 'admin',
      recipient_id: 'admin',
      content: 'sd',
      url_image: '',
      type: 'notify',
    };

    console.log('====', data);

    this.server.emit('message', message);
  }
}
