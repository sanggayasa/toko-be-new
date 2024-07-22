import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  sender_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  recipient_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 16)
  url_image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 8)
  created_at: string;
}
