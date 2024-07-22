import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  product_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(1, 16)
  price: number;

  @IsNotEmpty()
  @IsString()
  quantity: number;

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

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
