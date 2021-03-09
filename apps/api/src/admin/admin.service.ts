import { Injectable } from '@nestjs/common';
import { AdminDao } from './admin.dao';
export interface Admin {
  username: string,
  password: string
} 

@Injectable()
export class AdminService {
  constructor(
    private readonly adminDao: AdminDao
  ) {
    //
  }

  async findAdmin(username: string): Promise<Admin | undefined> {
    return this.adminDao.findAdmin(username);
  }
}