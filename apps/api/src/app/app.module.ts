import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [MaintenanceRequestModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
