import { Test } from '@nestjs/testing';
import { StorageModule } from '../../storage/storage.module';
import { BimModule } from '../bim.module';
import { EntityService } from '../services/entity.service';
import { EntityResolver } from './entity.resolver';

describe('entity.resolver', () => {
  const entitiesMock = [
    {
      entityId: 1,
      name: 'test_entity_1',
      properties: {},
    },
    {
      entityId: 2,
      name: 'test_entity_2',
      properties: {},
    },
    {
      entityId: 3,
      name: 'test_entity_2',
      properties: {},
    },
  ];
  let entityResolver: EntityResolver;
  const entityService: EntityService = {
    getAll: async () => entitiesMock,
    getById: async (id) => entitiesMock?.find((b) => b.entityId == id),
  } as any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BimModule, StorageModule],
    })
      .overrideProvider(EntityService)
      .useValue(entityService)
      .compile();

    entityResolver = await moduleRef.resolve(EntityResolver);
  });

  it('should return all entities', async () => {
    const result = await entityResolver.entities(1);
    expect(result).toHaveLength(entitiesMock.length);
  });

  it('should select entity by id', async () => {
    const result = await entityResolver.entity(2, 1);
    expect(result.entityId).toBe(2);
  });
});
