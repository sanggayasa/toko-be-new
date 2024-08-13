import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat, ChatList } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ChatGateway,
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([ChatList]),
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
