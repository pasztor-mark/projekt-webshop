import { IsInt, IsEnum, IsArray } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  totalPrice: number;

  status: OrderStatus;

  customerId: number;

  guideIds: number[];

  lessonIds: number[];
}
