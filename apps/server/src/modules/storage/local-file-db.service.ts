import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';

export interface ILocalFileDB<T> {
  all: () => T[];
}
@Injectable()
export class LocalFileDbService<T> {
  load(filePath: string): Promise<ILocalFileDB<T>> {
    return new Promise((resolve, reject) => {
      readFile(filePath, 'utf8', (error, content) => {
        if (error) {
          console.error('LocalFileDbService error:', error);
          reject(error);
          return;
        }
        const data = JSON.parse(content) as T[];
        resolve({
          all: () => data,
        });
      });
    });
  }
}
