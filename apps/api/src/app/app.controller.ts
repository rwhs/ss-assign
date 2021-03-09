import { AppService } from './app.service';
import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Admin, } from '../admin/admin.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // Login Route
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(
    @Body() admin: Admin
  ) {
    return this.authService.login(admin)
  }
}
