import { Get, Post, Controller, Body, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { NotFoundInterceptor } from './app.interceptor';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/:id')
  @UseInterceptors(NotFoundInterceptor)
  getUser(@Param('id', new ParseIntPipe()) id: number): User {
    return this.userService.getUser(id);
  }

  @Post('/users')
  saveUser(@Body() user: User): number {
    return this.userService.saveUser(user);
  }
}
