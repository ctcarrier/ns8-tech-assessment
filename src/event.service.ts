import { Injectable } from '@nestjs/common';
import { Event } from './event.model';

@Injectable()
export class EventService {
  store: Event[] = [];
  seq: number = 0;
  getEvent(id: number): Event {
    return this.store.find(i => i.id === id);
  }

  getEvents(onlyRecent: boolean): Event[] {
    if (onlyRecent) {
      const dayInMillis = 24 * 60 * 60 * 1000;
      const dayAgoInMillis = Date.now() - dayInMillis;
      return this.getEventsByMinTime(dayAgoInMillis);
    }
    return this.store;
  }

  getEventsByUserId(userId: number): Event[] {
    return this.store.filter(i => i.userId === userId);
  }

  getEventsByMinTime(minTime: number): Event[] {
    return this.store.filter(i => i.created >= minTime);
  }

  saveEvent(userId: number, event: Event): number {
    const saveSeq: number = this.seq;
    const toSave = Object.assign({}, event, {
      id: saveSeq,
      userId,
      created: Date.now(),
    });
    this.store.push(toSave);
    this.seq += 1;
    return saveSeq;
  }
}
