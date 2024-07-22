import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  unique_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  amount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  note: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  type_fee: string;
}
