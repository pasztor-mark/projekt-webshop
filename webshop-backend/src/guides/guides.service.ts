import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { $Enums, Guide } from '@prisma/client';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Injectable()
export class GuidesService {
  constructor(private readonly db: PrismaService) {}

  async create(createGuideDto: CreateGuideDto) {
    try {
      const guide = await this.db.guide.create({
        data: createGuideDto,
      });
      return guide;
    } catch (error) {
      return 'Hiba a mentés során';
    }
  }

  async findAll() {
    return await this.db.guide.findMany();
  }

  async findGuideList(
    page: number,
    pageSize: number,
    search: string,
    orderFactor: keyof Guide,
    order: 'asc' | 'desc',
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const guides = await this.db.guide.findMany({
      skip: skip,
      take,
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { author: { name: { contains: search } } },
        ],
      },
      orderBy: {
        [orderFactor]: order,
      },
      include: {
        author: true,
        orders: true,
      },
    });

    guides.forEach((guide) => {
      delete guide.author.password;
      delete guide.author.email;
      
    });
    
    return { guides, totalPages: Math.ceil((await this.db.guide.count()) / pageSize)}
  }

  async findManyByAuthorId(authorId: number) {
    return await this.db.guide.findMany({
      where: {
        authorId,
      },
    });
  }

  async findManyByCopyOwner(copyOwnerId: number) {
    return await this.db.guide.findMany({
      where: {
        orders: {
          some: {
            customerId: copyOwnerId,
          },
        },
      },
    });
  }

  async findManyBySubject(subject: $Enums.Subject) {
    return await this.db.guide.findMany({
      where: {
        subject,
      },
    });
  }

  async findManyByLevel(level: $Enums.Level) {
    return await this.db.guide.findMany({
      where: {
        level,
      },
    });
  }

  async findOne(id: number) {
    return await this.db.guide.findFirstOrThrow({
      where: {
        id
      },
    });
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    await this.db.guide.update({
      where: {
        id,
      },
      data: updateGuideDto,
    });

    return `#${id} útmutató frissítve`;
  }

  async remove(id: number) {
    await this.db.guide.delete({
      where: {
        id
      },
    });
    return ` #${id} útmutató törölve`;
  }
}
