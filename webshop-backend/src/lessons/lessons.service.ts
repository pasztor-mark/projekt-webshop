import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { $Enums } from '@prisma/client';
import { Lesson } from '../../../shared/types';

@Injectable()
export class LessonsService {
  constructor(private readonly db: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.db.lesson.create({
        data: {
          title: createLessonDto.title,
          description: createLessonDto.description,
          price: createLessonDto.price,
          startTime: createLessonDto.startTime,
          endTime: createLessonDto.endTime,
          host: {
            connect: {
              id: createLessonDto.hostId,
            },
          },
          level: createLessonDto.level as $Enums.Level,
          subject: createLessonDto.subject as $Enums.Subject,
        }
      });
      
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async addParticipants(lessonId: number, participantIds: number[]) {
    try {
      await this.db.lesson.update({
        where: { id: lessonId },
        data: {
          participants: {
            connect: participantIds.map(id => ({ id })),
          },
          orders: {
            create: participantIds.map(id => ({
              customerId: id,
              status: 'Paid',
              lessons: {
                connect: { id: lessonId },
              },
              totalPrice: 0,
            })),
          },
        },
      });
      return 'Résztvevők hozzáadva';
    } catch (error) {
      return 'Hiba a résztvevők hozzáadásakor';
    }
  }
  async findLessonList(
    page: number,
    pageSize: number,
    search: string,
    orderFactor: keyof Lesson,
    order: 'asc' | 'desc',
    subjects: $Enums.Subject[],
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const validSubjects = subjects.filter(subject => Object.values($Enums.Subject).includes(subject));

    const lessons = await this.db.lesson.findMany({
      skip,
      take,
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search} },
              { description: { contains: search } },
              { host: { name: { contains: search} } },
            ],
          },
          {
            subject: {
              in: validSubjects.length > 0 ? validSubjects : Object.values($Enums.Subject),
            },
          },
        ],
      },
      orderBy: {
        [orderFactor]: order,
      },
      include: {
        host: true,
        orders: true,
      },
    });

    lessons.forEach((guide) => {
      delete guide.host.password;
      delete guide.host.email;
    });

    const totalLessons = await this.db.lesson.count({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
              { host: { name: { contains: search } } },
            ],
          },
          {
            subject: {
              in: validSubjects.length > 0 ? validSubjects : Object.values($Enums.Subject),
            },
          },
        ],
      },
    });

    return {
      lessons,
      totalPages: Math.ceil(totalLessons / pageSize),
    };
  }
  async findAll() {
    return await this.db.lesson.findMany();
  }
  async findManyPurchasedLessonsByCustomerId(customerId: number) {
    return await this.db.lesson.findMany({
      where: {
        orders: {
          some: {
            customerId,
          },
        },
      },
      include: {
        host: true,
        orders: true,
      }
    });
  }
  async findManyByIds(ids: number[]) {
    return await this.db.lesson.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findManyByHostId(hostId: number) {
    return await this.db.lesson.findMany({
      where: {
        hostId,
      },
      include: {
        host: true,
        
      }
    });
  }
  async findManyByParticipantId(participantId: number) {
    return await this.db.lesson.findMany({
      where: {
        participants: {
          some: {
            id: participantId
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })
  }
  async findManyBySubject(subject: $Enums.Subject) {
    return await this.db.lesson.findMany({
      where: {
        subject,
      },
    });
  }

  async findManyByPriceRange(minPrice: number, maxPrice) {
    return await this.db.lesson.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  }

  async findManyByLevel(level: $Enums.Level) {
    return await this.db.lesson.findMany({
      where: {
        level,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.lesson.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      await this.db.lesson.update({
        where: {
          id,
        },
        data: {
          title: updateLessonDto.title,
          description: updateLessonDto.description,
          price: updateLessonDto.price,
          startTime: updateLessonDto.startTime,
          endTime: updateLessonDto.endTime,
          level: updateLessonDto.level as $Enums.Level,
          subject: updateLessonDto.subject as $Enums.Subject,
        }
      });
    } catch (error) {
      throw new BadRequestException();
    }
    return `#${id} tanóra frissítve`;
  }

  async remove(id: number) {
    await this.db.lesson.delete({
      where: {
        id,
      },
    });
    return `#${id} tanóra törölve`;
  }
}
