import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { $Enums } from '@prisma/client';
import { Lesson } from '../../../shared/types';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Put(':id/participants')
  addParticipants(@Param('id') id: string, @Body('participantIds') participantIds: number[]) {
    return this.lessonsService.addParticipants(+id, participantIds);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }
  @Get("list")
  async findLessonList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 8,
    @Query('search') search: string = '',
    @Query('orderFactor') orderFactor: keyof Lesson = 'id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('subjects') subjects: $Enums.Subject[] = Object.values($Enums.Subject)
  ) {
    
    return await this.lessonsService.findLessonList(+page, +pageSize, search, orderFactor, order, subjects);
  }
  @Get('cart')
  findManyByIds(@Query('ids') ids: string) {
    return this.lessonsService.findManyByIds(ids.split(',').map(id => +id));
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }


  @Get('host/:hostId')
  findManyByHostId(@Param('hostId') hostId: string) {
    return this.lessonsService.findManyByHostId(+hostId);
  }

  @Get('subject/:subject')
  findManyBySubject(@Param('subject') subject: string) {
    return this.lessonsService.findManyBySubject(subject as $Enums.Subject);
  }
  @Get('participant/:participantId')
  findManyByParticipant(@Param('participantId') participantId: string) {
    return this.lessonsService.findManyByParticipantId(+participantId)
  }

  @Get('price-range')
  findManyByPriceRange(@Query('minPrice') minPrice: string, @Query('maxPrice') maxPrice: string) {
    return this.lessonsService.findManyByPriceRange(+minPrice, +maxPrice);
  }

  @Get('level/:level')
  findManyByLevel(@Param('level') level: string) {
    return this.lessonsService.findManyByLevel(level as $Enums.Level);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
