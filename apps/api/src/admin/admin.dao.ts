import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./db/admins.json')
const db = low(adapter)

db.defaults({ admins: [] }).write();

@Injectable()
export class AdminDao {
  //
  private get collection(): any {
    return db.get('admins');
  }

  // Finds an admin with given username
  async findAdmin(username: string) {
    return await this.collection.find({ username: username }).value();
  }

  // Creates a new admin
  async createAdmin(username: string, passwordHash: string) {
    // No admin exists with that name, create new admin
    if (!this.collection.find({ username: username }).value()) {
      await this.collection.push({
        username: username,
        passwordHash: passwordHash
      })
      .write();
      return true;
    }
    return false;
  }
}