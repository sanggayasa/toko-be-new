import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdateUserDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  provinsi: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  kota: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  kecamatan: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  kelurahan: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  rt: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  rw: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  kode_pos: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  alamat: string;
}
