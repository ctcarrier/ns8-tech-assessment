import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event.controller';
import { UserController } from './user.controller';
import { EventService } from './event.service';
import { UserService } from './user.service';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('user controller', () => {
    it('should save a user and return 0', () => {
      const userController = app.get<UserController>(UserController);
      expect(userController.saveUser({
        email: 'test@example.com',
        phoneNumber: '555-555-5555',
        password: 'wakka'
      })).toBe(0);
    });
    it('should return "USER" for GET', () => {
      const userController = app.get<UserController>(UserController);
      expect(userController.getUser(0)).toEqual({
        id: 0,
        email: 'test@example.com',
        phoneNumber: '555-555-5555',
        password: 'wakka'
      });
    });
  });
});
