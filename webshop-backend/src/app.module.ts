import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { LessonsModule } from './lessons/lessons.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, GuidesModule, LessonsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
