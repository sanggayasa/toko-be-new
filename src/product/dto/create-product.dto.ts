import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
  IsArray,
  // ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  category_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(1, 16)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Length(1, 8)
  discount: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  created_by: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  created_at: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  updated_by: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  updated_at: string;

  @IsNumber()
  @Length(1, 8)
  priceMin: number;

  @IsNumber()
  @Length(1, 8)
  priceMax: number;

  @IsNotEmpty()
  @IsString()
  stock: number;

  @IsNotEmpty()
  @IsString()
  weight: number;

  @IsOptional()
  @IsArray()
  // @ArrayNotEmpty()
  images: string;
}
