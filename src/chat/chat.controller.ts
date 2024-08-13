import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { ResponseMessage } from 'src/utils/decorator/response.decorator';
import { responseMessage } from 'src/utils/constant';
import { ChatGateway } from './chat.gateway';
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatsGateway: ChatGateway,
  ) {}

  @Post()
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post('/find')
  findOne(@Body() createChatDto: CreateChatDto) {
    return this.chatService.findByUser(
      createChatDto.recipient_id,
      createChatDto.sender_id,
    );
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Post('notif')
  postData(@Body() data: any) {
    return this.chatsGateway.sendToAllClients(data);
  }
}
