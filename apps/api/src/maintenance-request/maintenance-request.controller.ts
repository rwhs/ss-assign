import { BadRequestException, Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @Get('/')
  public async getOpenMaintenanceRequests() {
    return await this.maintenanceRequestService.getOpenMaintenanceRequests();
  }

  @Put('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id:string,
  ) {
    const response = await this.maintenanceRequestService.closeMaintenanceRequest(id);
    
    if (!response.id) {
      throw new BadRequestException('Invalid id provided')
    }

    const result = {
      id: response.id,
      requestOpen: response.requestOpen,
      closedAt: response.closedAt
    }

    return result;
  }
}
