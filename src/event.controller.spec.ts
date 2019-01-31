import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event.controller';
import { UserController } from './user.controller';
import { EventService } from './event.service';
import { UserService } from './user.service';

describe('EventController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();
  });

  describe('event controller', () => {
    it('should save an event and return 0', () => {
      const eventController = app.get<EventController>(EventController);
      expect(eventController.saveEvent(0, {
        type: 'eventTest'
      })).toBe(0);
    });
    it('should save a second event and return 1', () => {
      const eventController = app.get<EventController>(EventController);
      expect(eventController.saveEvent(0, {
        type: 'eventTest2'
      })).toBe(1);
    });
    it('should return an event for GET', () => {
      const eventController = app.get<EventController>(EventController);
      expect(eventController.getEvent(0).type).toBe('eventTest');
    });
    it('should return event 0 and event 1 when looking up by user 0', () => {
      const eventController = app.get<EventController>(EventController);
      const results = eventController.getEventsByUserId(0);
      expect(results.find(i => i.id === 0).type).toBe('eventTest');
      expect(results.find(i => i.id === 1).type).toBe('eventTest2');
      expect(results.length).toBe(2);
    });
  });
});
