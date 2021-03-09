import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  // Validates admin name and password combination
  async validateAdmin(username: string, pass: string) {
    const user = await this.adminService.findAdmin(username);
    let match = false;

    // Check for correct password hash
    if (user) {
      match = await bcrypt.compare(pass, user.passwordHash)
    }
    // OK, password and hash match
    if (user && match === true) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  // Generates a JWT token if login was OK
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}