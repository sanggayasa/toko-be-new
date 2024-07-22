import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  ParseUUIDPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ResponseMessage } from 'src/utils/decorator/response.decorator';
import { responseMessage } from 'src/utils/constant';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findByFilter() {
    return this.categoryService.findBy();
  }

  @Get(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(responseMessage.SUCCESS_UPDATE)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage(responseMessage.SUCCESS_DELETE)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
