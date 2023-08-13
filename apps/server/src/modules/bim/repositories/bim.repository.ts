import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { LocalFileDbService } from 'src/modules/storage/local-file-db.service';
import { Bim, IBim } from '../models/bim.model';

interface ILocalDB<T> {
  all: () => T[];
}

const bimsFixtures = join(__dirname, '..', '..', '..', 'fixtures', 'bims.json');

@Injectable()
export class BimRepository {
  db: ILocalDB<Bim>;

  constructor(private localDbService: LocalFileDbService<Bim>) {}

  private async initDb(): Promise<ILocalDB<IBim>> {
    if (this.db) return this.db;
    this.db = await this.localDbService.load(bimsFixtures);
    return this.db;
  }

  async getAll(): Promise<IBim[]> {
    const db = await this.initDb();
    return db.all();
  }

  async getById(id: number): Promise<IBim> {
    const db = await this.initDb();
    return db.all().find((b) => b.id === id);
  }
}
