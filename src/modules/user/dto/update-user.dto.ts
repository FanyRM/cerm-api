import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  /* @IsOptional()
  @IsArray()
  tasks?: number[]; */
}
