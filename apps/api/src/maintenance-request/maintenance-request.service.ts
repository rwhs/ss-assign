import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB, MaintenanceRequestData } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestData> {
    return await this.maintReqDao.getOpenMaintenanceRequests();
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB>{
    return await this.maintReqDao.closeMaintenanceRequest(id);
  }
}
