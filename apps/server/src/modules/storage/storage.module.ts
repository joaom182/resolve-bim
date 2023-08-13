import { Module } from '@nestjs/common';
import { LocalFileDbService } from './local-file-db.service';
import { SqliteDbStorageService } from './sqlite-db-storage.service';
import { SqliteDbService } from './sqlite-db.service';

@Module({
  imports: [],
  providers: [SqliteDbStorageService, LocalFileDbService, SqliteDbService],
  exports: [SqliteDbStorageService, LocalFileDbService, SqliteDbService],
})
export class StorageModule {}
