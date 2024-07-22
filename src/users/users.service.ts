import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
// import { ErrorException } from 'src/utils/custom.exceptions';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private context: string = 'user';
  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  async create(createUserDto: CreateUserDto) {
    const checkDuplicateEmail = await this.userRepository.findBy({
      email: createUserDto.email,
    });

    const checkDuplicatePhone = await this.userRepository.findBy({
      phone: createUserDto.phone,
    });

    const mapDucplicate = (message) => {
      return {
        httpStatus: 409,
        caseCode: '00',
        message: message,
      };
    };

    if (checkDuplicateEmail.length > 0) {
      // throw new ErrorException(mapDucplicate('Email sudah terdaftar'));
    }

    if (checkDuplicatePhone.length > 0) {
      // throw new ErrorException(mapDucplicate('Phone sudah terdaftar'));
    }

    const password = createUserDto.password;
    const hash = Buffer.from(password).toString('base64');
    createUserDto.password = hash;

    return await this.userRepository.insert({
      ...createUserDto,
      created_by: createUserDto.name,
      updated_by: '',
    });
  }

  async findAll() {
    const whereFilter: Record<string, any> = {};

    const data = await paginate(
      this.userRepository,
      {
        page: 1,
        limit: 10,
      },
      {
        where: whereFilter,
        relations: [],
        order: {
          name: 'ASC',
        },
      },
    );

    return data;
  }

  async findOne(email: string) {
    const data = await this.userRepository.findOneBy({ email });

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const checkIsDataExist = await this.userRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new NotFoundException(this.context);
    }

    return await this.userRepository.update(id, {
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
