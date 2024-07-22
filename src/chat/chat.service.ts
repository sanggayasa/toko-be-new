import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat, ChatList } from './entities/chat.entity';
// import { paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(ChatList)
    private readonly chatListRepository: Repository<ChatList>,
  ) {}

  private context: string = 'chat';
  async create(createUserDto: CreateChatDto) {
    return await this.chatRepository.insert({
      ...createUserDto,
      created_at: new Date(),
    });
  }

  async findByUser(recipient_id: string, sender_id: string) {
    const data = await this.chatRepository.find({
      where: [{ recipient_id: recipient_id }, { sender_id: sender_id }],
      order: { created_at: 'ASC' },
    });
    console.log(data);
    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async findAll() {
    const data = await this.chatListRepository.find();

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }
}
