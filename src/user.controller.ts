import { Post, Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  saveUser(@Body() user: User): number {
    return this.userService.saveUser(user);
  }
}
