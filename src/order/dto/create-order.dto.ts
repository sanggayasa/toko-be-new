import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  unique_code: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  product_list: any;

  @IsNotEmpty()
  @IsNumber()
  @Length(1, 16)
  payment_type: string;

  @IsNotEmpty()
  @IsString()
  address_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  total_price: string;

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
