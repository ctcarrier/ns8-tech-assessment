import {
  Get,
  Post,
  Controller,
  Param,
  ParseIntPipe,
  Body,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.model';
import { NotFoundInterceptor } from './app.interceptor';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/events/:id')
  @UseInterceptors(NotFoundInterceptor)
  getEvent(@Param('id', new ParseIntPipe()) id: number): Event {
    return this.eventService.getEvent(id);
  }

  @Get('/events')
  getEvents(@Query('onlyRecent') onlyRecent: string): Array<Event> {
    const isOnlyRecent: boolean = onlyRecent === 'true';
    return this.eventService.getEvents(isOnlyRecent);
  }

  @Get('/users/:userId/events')
  getEventsByUserId(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Array<Event> {
    return this.eventService.getEventsByUserId(userId);
  }

  @Post('/users/:userId/events')
  saveEvent(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() event: Event,
  ): number {
    return this.eventService.saveEvent(userId, event);
  }
}
