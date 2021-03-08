import { Injectable } from '@nestjs/common';

export type Admin = any;

@Injectable()
export class AdminService {
  private readonly admins = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<Admin | undefined> {
    return this.admins.find(admins => admins.username === username);
  }
}