import { Test } from '@nestjs/testing';
import { SqliteDbService } from '../../../modules/storage/sqlite-db.service';
import { StorageModule } from '../../storage/storage.module';
import { BimModule } from '../bim.module';
import { EntityRepository } from './entity.repository';

describe('entity.repository', () => {
  let entityRepository: EntityRepository;
  let mockDb = { all: (_, cb) => cb(null, []) };
  const sqliteDbService: SqliteDbService = {
    init: async () => mockDb,
  } as any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BimModule, StorageModule],
    })
      .overrideProvider(SqliteDbService)
      .useValue(sqliteDbService)
      .compile();

    entityRepository = await moduleRef.resolve(EntityRepository);
  });

  it('should return all entities properties', async () => {
    mockDb = {
      all: async (_, callback) =>
        callback(null, [
          {
            entityId: 1,
            attributeCategory: 'category_test',
            attributeName: 'name_test',
            attributeValue: 'value_test',
            attributeContext: 'context_test',
          },
          {
            entityId: 2,
            attributeCategory: 'category_test',
            attributeName: 'name_test',
            attributeValue: 'value_test',
            attributeContext: 'context_test',
          },
        ]),
    } as any;
    const result = await entityRepository.getAll('test_mock_url');
    expect(result).toHaveLength(2);
  });

  it('should return an entity properties by entity id', async () => {
    mockDb = {
      all: async (_, callback) =>
        callback(null, [
          {
            entityId: 3,
            attributeCategory: 'category_test',
            attributeName: 'name_test',
            attributeValue: 'value_test',
            attributeContext: 'context_test',
          },
          {
            entityId: 3,
            attributeCategory: 'category_test',
            attributeName: 'name_test',
            attributeValue: 'value_test',
            attributeContext: 'context_test',
          },
          {
            entityId: 3,
            attributeCategory: 'category_test',
            attributeName: 'name_test',
            attributeValue: 'value_test',
            attributeContext: 'context_test',
          },
        ]),
    } as any;
    const result = await entityRepository.getById(3, 'test_mock_url');
    expect(result).toHaveLength(3);
    expect(result.every((r) => r.entityId === 3)).toBeTruthy();
  });
});
