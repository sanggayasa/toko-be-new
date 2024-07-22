import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  role_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  via_login: string;
}
