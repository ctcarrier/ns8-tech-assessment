import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EventController } from './event.controller';
import { UserService } from './user.service';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [UserController, EventController],
  providers: [UserService, EventService],
})
export class AppModule {}
