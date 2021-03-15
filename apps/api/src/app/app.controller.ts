import { AppService } from './app.service';
import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
// import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/admin.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    // private adminService: AdminService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  // Login Route to get JWT
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(
    @Body() admin: Admin
  ) {
    return this.authService.login(admin)
  }

  // Create new admin. Could use guard? Or not exist
  // @Post('/admin')
  // public async createAdmin(
  //   @Body() admin: Admin
  // ) {
  //   return this.adminService.createAdmin(admin.username, admin.password);
  // }
}
