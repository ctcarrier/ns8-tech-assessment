import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller';
import { EventController } from './event.controller';
import { UserService } from './user.service';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, EventController],
  providers: [AppService, UserService, EventService],
})
export class AppModule {}
