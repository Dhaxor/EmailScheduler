import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('/register')
  async register(@Body() user: UserEntity) {
    return this.authService.create(user);
  }

  @Get('/getAll')
  async getAll() {
    return this.authService.getAll();
  }
}
