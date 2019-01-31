import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
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
      expect(
        userController.saveUser({
          email: 'test@example.com',
          phoneNumber: '555-555-5555',
          password: 'wakka',
        }),
      ).toBe(0);
    });
  });
});
