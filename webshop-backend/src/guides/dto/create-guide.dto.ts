import { IsInt, IsString, Max, MaxLength, Min, MinLength, IsDate, IsEnum } from 'class-validator'
import { $Enums } from '@prisma/client';
import { Level, Subject } from '../../../../shared/types';

export class CreateGuideDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(255)
  description: string;

  @IsInt()
  @Min(0)
  @Max(500000)
  price: number;
  
  @IsEnum(Subject)
  subject: $Enums.Subject;

  @IsEnum(Level)
  level: $Enums.Level;

  @IsInt()
  authorId: number;
}
