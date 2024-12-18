import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.db.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      })
      if (existingUser) {
        throw new ConflictException('Ez az email cím már használatban van');  
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.db.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          name: createUserDto.name,
          address: createUserDto.address  || "",
          phoneNumber: createUserDto.phoneNumber || ""
        },
      });
      return createUserDto;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.db.user.findMany();
  }
  async getProfileData(userId: number) {
    const profile = await this.db.user.findFirst({
      where: {
        id: userId
      },
      include: {
        authoredGuides: true,
        hostedLessons: true,
        
      }
      
    })
    delete profile.password
    return profile
  }
  async findUserByEmail(email: string) {
    return await this.db.user.findFirst(({ where: { email: email } }));
  }
  async updateProfileName(userId: number, name: string) {
    await this.db.user.update({
      where: {
        id: userId
      },
      data: {
        name: name
      }
    })
    return `Felhasználói név frissítve`
  }
  async updatePassword(userId: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.db.user.update({
      where: {
        id: userId
      },
      data: {
        password: hashedPassword
      }
    })
    return `Jelszó frissítve`
  }
  async findAuthors() {
    const authors =  await this.db.user.findMany({
      where: {
      OR: [
        {
        hostedLessons: {
          some: {},
        },
        },
        {
        authoredGuides: {
          some: {},
        },
        },
      ],
      },
      include: {
      authoredGuides: true,
      hostedLessons: true,
      },
    });
    authors.forEach(author => delete author.password);
    return authors;
  }
async findPayingUsers() {
    return await this.db.user.findMany({
      where: {
        orders: {
          some: {
            totalPrice: {
              gt: 0,
            },
          },
        },
      },
      include: {
        orders: true,
      },
    });
}
  async findOne(id: number) {
    return await this.db.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.db.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
        name: updateUserDto.name,
        address: updateUserDto.address,
        phoneNumber: updateUserDto.phoneNumber,
      },
    });
    return `${id} azonosítójú felhasználó adatai frissítve`;
  }

  async remove(id: number) {
    await this.db.user.delete({
      where: {
        id,
      },
    });
    return `${id} azonosítójú felhasználó törölve`;
  }
}
