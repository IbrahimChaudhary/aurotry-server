import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard.';

@Controller('users')
@UseGuards(AuthGuard) 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userData: { name: string; email: string }) {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<{ name: string; email: string }>
  ) {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}