import { Get, Post, Controller, Param, ParseIntPipe, Body, UseInterceptors, Query } from '@nestjs/common';
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
  getEvents(@Query('onlyRecent') onlyRecent: boolean): Array<Event> {
    if (onlyRecent) {
      const dayAgoInMillis = Date.now() - (24 * 60 * 60 * 1000);
      return this.eventService.getEventsByMinTime(dayAgoInMillis);
    }
    return this.eventService.getEvents();
  }

  @Get('/users/:userId/events')
  getEventsByUserId(@Param('userId', new ParseIntPipe()) userId: number): Array<Event> {
    return this.eventService.getEventsByUserId(userId);
  }

  @Post('/users/:userId/events')
  saveEvent(@Param('userId', new ParseIntPipe()) userId: number, @Body() event: Event): number {
    return this.eventService.saveEvent(userId, event);
  }
}
