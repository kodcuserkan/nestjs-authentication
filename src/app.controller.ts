import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req:{ user: User}): any {
    return {
      user: req.user,
      message: 'You are logged in',
    }
  }

  // GET / protected
  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req: { user: User}): any {
    return req.user;
  }
}
