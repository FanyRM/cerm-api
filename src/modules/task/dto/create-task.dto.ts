import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MinLength(3)
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  priority: boolean;
}
