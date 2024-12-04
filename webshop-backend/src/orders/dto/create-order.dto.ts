import { OrderStatus } from "../../../../shared/types"

export class CreateOrderDto {
    totalPrice: number
    status: OrderStatus
}
