import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { unlink as unlinkAsync } from 'fs';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { ErrorException } from '../utils/custom.exceptions';
import { responseMessage } from '../utils/constant';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  private context: string = 'category';
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.insert({
      ...createCategoryDto,
      created_at: new Date(),
    });
  }

  async findBy() {
    const data = await this.categoryRepository.find();
    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async findOne(id: string) {
    const data = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(this.context);
    }

    return data;
  }

  async update(id: string, updateProductDto: CreateCategoryDto) {
    const checkIsDataExist = await this.categoryRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    return await this.categoryRepository.update(id, {
      ...updateProductDto,
    });
  }

  async deleteImage(filePath: string) {
    try {
      let status: string;
      await unlinkAsync(filePath, (err) => {
        if (err) {
          console.log('errorss');
          status = 'failed';
        } else {
          status = 'success';
        }
      });
      return { status: status };
    } catch (error) {
      return { status: 'failed', message: error };
    }
  }

  async remove(id: string) {
    const checkIsDataExist = await this.categoryRepository.findOneBy({ id });

    if (!checkIsDataExist) {
      throw new ErrorException(responseMessage.NOT_FOUND);
    }

    await this.categoryRepository.update(id, {
      updated_by: 'sangga',
    });
    return await this.categoryRepository.softDelete({ id });
    // return true;
  }
}
