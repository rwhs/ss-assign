import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  requestOpen: boolean;
  submittedAt: Date;
  modifiedAt: Date;
  closedAt: Date;
}

export interface MaintenanceRequestData {
  requests: MaintenanceRequestDB[];
}

const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  // Create new maintenance request
  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) }; // generates random 10 character ID
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        requestOpen: true,
        submittedAt: new Date(),
        modifiedAt: new Date(),
        closedAt: new Date()
      })
      .write()
    return id;
  }

  // Returns specific maintenance request by ID
  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }

  // Returns all open requests
  async getOpenMaintenanceRequests(): Promise<MaintenanceRequestData> {
    return await this.collection.filter({ 'requestOpen': true });
  }

  // Close a specific maintenance request by ID
  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id })
      .assign({
        'requestOpen': false,
        'closedAt': new Date()
      })
      .write()
  }
}
