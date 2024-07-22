import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

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
}
