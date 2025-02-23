import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return { id, name: 'User ' + id };
  }

  @Post()
  createUser(@Body() user: { name: string }) {
    return { id: 2, ...user };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: { name: string }) {
    return { id, ...user };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return { message: `User ${id} deleted` };
  }

}
