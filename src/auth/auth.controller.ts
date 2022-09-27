import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: InMemoryDBService<UserEntity>) {}

  // POST /auth/register
  @Post('/register')
  async register(@Body() user: UserEntity) {
    return this.authService.create(user);
  }
}
