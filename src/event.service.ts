import { Injectable } from '@nestjs/common';
import { Event } from './event.model';

@Injectable()
export class EventService {
  store: Array<Event> = [];
  seq: number = 0;
  getEvent(id: number): Event {
    return this.store.find(i => i.id === id);
  }

  getEvents(): Array<Event> {
    return this.store;
  }

  getEventsByUserId(userId: number): Array<Event> {
    return this.store.filter(i => i.userId === userId);
  }

  getEventsByMinTime(minTime: number): Array<Event> {
    return this.store.filter(i => i.created >= minTime);
  }

  saveEvent(userId: number, event: Event): number {
    const saveSeq: number = this.seq;
    const toSave = Object.assign({}, event, { id: saveSeq, userId, created: Date.now() });
    this.store.push(toSave);
    this.seq += 1;
    return saveSeq;
  }
}
