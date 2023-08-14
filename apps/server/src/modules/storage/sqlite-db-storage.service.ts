import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync } from 'fs';
import { join } from 'path';
import * as request from 'request';
import generateHashCode from '../../helpers/hash-code-generator';

export const dbsPath: string = join(__dirname, '..', '..', '__temp__');

@Injectable()
export class SqliteDbStorageService {
  dbIsAvailable(dbFileUrl: string): boolean {
    const dbHashCode = generateHashCode(dbFileUrl);
    return existsSync(`${dbsPath}/${dbHashCode}.db`);
  }

  async downloadDb(dbFileUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        const dbHashCode = generateHashCode(dbFileUrl);
        const dbFileName = `${dbHashCode}.db`;
        const dbPath = `${dbsPath}/${dbFileName}`;
        const fileStream = createWriteStream(dbPath);

        const errorHandler = (err) => {
          console.error(err);
          fileStream.destroy();
          reject(err);
        };

        request(dbFileUrl)
          .on('error', errorHandler)
          .on('request', () => {
            console.log(`Downloading DB to: ${dbPath}`);
          })
          .pipe(fileStream)
          .on('finish', () => {
            console.log(`DB downloaded to: ${dbPath}`);
            fileStream.end();
            resolve(dbPath);
          })
          .on('error', errorHandler);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  getDbPath(dbFileUrl: string) {
    const dbHashCode = generateHashCode(dbFileUrl);
    return `${dbsPath}/${dbHashCode}.db`;
  }
}
