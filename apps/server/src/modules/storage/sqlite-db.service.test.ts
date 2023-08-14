import { Test } from '@nestjs/testing';
import { StorageModule } from './storage.module';
import { SqliteDbStorageService } from './sqlite-db-storage.service';
import { SqliteDbService } from './sqlite-db.service';

jest.mock('sqlite3', () => ({
  Database: jest.fn(),
}));

describe('entity.service', () => {
  let sqliteDbService: SqliteDbService;
  const sqliteDbStorageService = {
    getDbPath: jest.fn(),
    dbIsAvailable: jest.fn(),
    downloadDb: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StorageModule],
    })
      .overrideProvider(SqliteDbStorageService)
      .useValue(sqliteDbStorageService)
      .compile();

    sqliteDbService = await moduleRef.resolve(SqliteDbService);
  });

  afterEach(() => {
    sqliteDbStorageService.getDbPath.mockClear();
    sqliteDbStorageService.dbIsAvailable.mockClear();
    sqliteDbStorageService.downloadDb.mockClear();
  });

  it('should return DB instance if DB is already available locally', async () => {
    const getDbPathSpy = jest
      .spyOn(sqliteDbStorageService, 'getDbPath')
      .mockReturnValue('db_path/test');
    const dbIsAvailableSpy = jest
      .spyOn(sqliteDbStorageService, 'dbIsAvailable')
      .mockReturnValue(true);
    const downloadDbSpy = jest.spyOn(sqliteDbStorageService, 'downloadDb');

    await sqliteDbService.init('test_url');
    expect(getDbPathSpy).toBeCalledTimes(1);
    expect(dbIsAvailableSpy).toBeCalledTimes(1);
    expect(downloadDbSpy).not.toBeCalled();
  });

  it('should download DB if DB is not available locally', async () => {
    const getDbPathSpy = jest
      .spyOn(sqliteDbStorageService, 'getDbPath')
      .mockReturnValue('db_path/test');
    const dbIsAvailableSpy = jest
      .spyOn(sqliteDbStorageService, 'dbIsAvailable')
      .mockReturnValue(false);
    const downloadDbSpy = jest
      .spyOn(sqliteDbStorageService, 'downloadDb')
      .mockResolvedValue(true);

    await sqliteDbService.init('test_url');
    expect(getDbPathSpy).toBeCalledTimes(1);
    expect(dbIsAvailableSpy).toBeCalledTimes(1);
    expect(downloadDbSpy).toBeCalledTimes(1);
  });
});
