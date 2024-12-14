import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { $Enums } from '@prisma/client';
import { Guide } from '../../../shared/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto);
  }

  @Get()
  findAll() {
    return this.guidesService.findAll();
  }
  @Get("list")
  async findGuideList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 8,
    @Query('search') search: string = '',
    @Query('orderFactor') orderFactor: keyof Guide = 'id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('subjects') subjects: $Enums.Subject[] = Object.values($Enums.Subject)
  ) {
    
    return await this.guidesService.findGuideList(+page, +pageSize, search, orderFactor, order, subjects);
  }
  @UseGuards(JwtAuthGuard)
  @Get('cart')
  findManyByIds(@Query('ids') ids: string) {
    return this.guidesService.findManyByIds(ids.split(',').map(id => +id));
  }
  @UseGuards(JwtAuthGuard)
  @Get('customer/:customerId')
  findManyByCustomerId(@Param('customerId') customerId: string) {
    return this.guidesService.findManyPurchasedGuidesByCustomerId(+customerId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidesService.findOne(+id);
  }
  
  @Get('author/:authorId')
  findManyByAuthorId(@Param('authorId') authorId: string) {
    return this.guidesService.findManyByAuthorId(+authorId);
  }
  
  @Get('subject/:subject')
  findManyBySubject(@Param('subject') subject: string) {
    return this.guidesService.findManyBySubject(subject as $Enums.Subject);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('copyOwner/:copyOwnerId')
  findManyByCopyOwner(@Param('copyOwnerId') copyOwnerId: string) {
    return this.guidesService.findManyByCopyOwner(+copyOwnerId);
  }
  @Get('level/:level')
  findManyByLevel(@Param('level') level: string) {
    return this.guidesService.findManyByLevel(level as $Enums.Level);
  }
  
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(+id);
  }
}
