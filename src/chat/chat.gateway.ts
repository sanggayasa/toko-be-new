import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import { ChatService } from './chat.service'; // Layanan untuk menyimpan data

@WebSocketGateway(8082, { cors: '*' })
export class ChatGateway {
  // constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: any) {
    // await this.chatService.saveMessage(message);
    this.server.emit('message', message);
  }
}
