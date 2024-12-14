import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('customer/:customerId/pending')
  findPendingByCustomerId(@Param('customerId') customerId: string) {
    return this.ordersService.findPendingByCustomerId(+customerId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('customer/:customerId')
  findAllByCustomerId(@Param('customerId') customerId: string) {
    return this.ordersService.findAllByCustomerId(+customerId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('guide/:guideId')
  findAllByGuideId(@Param('guideId') guideId: string) {
    return this.ordersService.findAllByGuideId(+guideId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('lesson/:lessonId')
  findAllByLessonId(@Param('lessonId') lessonId: string) {
    return this.ordersService.findAllByLessonId(+lessonId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('status/:status')
  findAllByStatus(@Param('status') status: string) {
    return this.ordersService.findAllByStatus(status as OrderStatus);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(+id, status);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
