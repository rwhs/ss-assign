import { Module } from '@nestjs/common';
import { AdminDao } from './admin.dao';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminService, AdminDao],
  exports: [AdminService]
})
export class AdminModule {}
