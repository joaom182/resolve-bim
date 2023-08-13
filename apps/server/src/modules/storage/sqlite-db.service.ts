import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { SqliteDbStorageService } from './sqlite-db-storage.service';

@Injectable()
export class SqliteDbService {
  constructor(private dbStorageService: SqliteDbStorageService) {}

  init(modelDbUrl: string): Promise<Database> {
    return new Promise((resolve, reject) => {
      const errorCallback = (err) => {
        if (!err) return;
        console.error(err);
        reject(err);
      };
      const dbPath = this.dbStorageService.getDbPath(modelDbUrl);

      try {
        if (this.dbStorageService.dbIsAvailable(modelDbUrl)) {
          resolve(new Database(dbPath, errorCallback));
          return;
        }
        this.dbStorageService
          .downloadDb(modelDbUrl)
          .then(() => {
            resolve(new Database(dbPath, errorCallback));
          })
          .catch(reject);
      } catch (err) {
        reject(err);
        return;
      }
    });
  }
}
