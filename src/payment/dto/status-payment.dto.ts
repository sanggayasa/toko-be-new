import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  pay_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  unique_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  signature: string;
}
