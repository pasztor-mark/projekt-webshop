import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { $Enums } from '@prisma/client';
import { Guide } from '../../../shared/types';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

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
  @Get('cart')
  findManyByIds(@Query('ids') ids: string) {
    return this.guidesService.findManyByIds(ids.split(',').map(id => +id));
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

  @Get('copyOwner/:copyOwnerId')
  findManyByCopyOwner(@Param('copyOwnerId') copyOwnerId: string) {
    return this.guidesService.findManyByCopyOwner(+copyOwnerId);
  }
  @Get('level/:level')
  findManyByLevel(@Param('level') level: string) {
    return this.guidesService.findManyByLevel(level as $Enums.Level);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(+id);
  }
}
