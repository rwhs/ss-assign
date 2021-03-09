import { Injectable } from '@nestjs/common';
import { AdminDao } from './admin.dao';
import * as bcrypt from 'bcrypt';
export interface Admin {
  username: string,
  password: string
}

export interface AdminDB {
  username: string,
  passwordHash: string
}

@Injectable()
export class AdminService {
  constructor(
    private readonly adminDao: AdminDao
  ) {
    //
  }

  async findAdmin(username: string): Promise<AdminDB | undefined> {
    return this.adminDao.findAdmin(username);
  }

  async createAdmin(username: string, password: string): Promise<boolean> {
    // Generate hash for password instead of using plaintext
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    return this.adminDao.createAdmin(username, passwordHash);
  }
}