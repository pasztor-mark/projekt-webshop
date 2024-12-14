import { IsString, MinLength, MaxLength, IsInt, Min, Max, IsArray, IsDate, IsEnum, IsOptional } from 'class-validator';
import { $Enums } from '@prisma/client';
import { Level, Subject } from '../../../../shared/types';

export class CreateLessonDto {
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

  
  startTime: Date;

  
  endTime: Date;

  @IsInt()
  hostId: number;

  @IsEnum(Level)
  level: $Enums.Level;
  @IsEnum(Subject)
  subject: $Enums.Subject;

  @IsArray()
  @IsOptional()
  participantIds: number[];
}
