import { IsInt, IsEnum, IsArray } from 'class-validator';
import { OrderStatus } from '../../../../shared/types';
import { $Enums } from '@prisma/client';

export class CreateOrderDto {
  @IsInt()
  totalPrice: number;

  @IsEnum(OrderStatus)
  status: $Enums.OrderStatus;

  @IsInt()
  customerId: number;

  @IsArray()
  @IsInt({ each: true })
  guideIds: number[];

  @IsArray()
  @IsInt({ each: true })
  lessonIds: number[];
}
