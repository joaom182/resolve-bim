import { Test } from '@nestjs/testing';
import { StorageModule } from '../../../modules/storage/storage.module';
import { BimModule } from '../bim.module';
import { BimService } from '../services/bim.service';
import { BimResolver } from './bim.resolver';
import { EntityResolver } from './entity.resolver';

describe('bim.resolver', () => {
  const bimsMock = [
    {
      id: 1,
      modelDbUrl: 'http://test.url',
    },
    {
      id: 2,
      modelDbUrl: 'http://test_2.url',
    },
  ];
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
  let bimResolver: BimResolver;
  const bimService: BimService = {
    getAll: async () => bimsMock,
    getById: async (id) => bimsMock?.find((b) => b.id == id),
  } as any;
  const entityResolver: EntityResolver = {
    entities: jest.fn().mockResolvedValue(entitiesMock),
    entity: jest
      .fn()
      .mockImplementation(async (id) =>
        entitiesMock.find((e) => e.entityId == id),
      ),
  } as any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BimModule, StorageModule],
    })
      .overrideProvider(BimService)
      .useValue(bimService)
      .overrideProvider(EntityResolver)
      .useValue(entityResolver)
      .compile();

    bimResolver = await moduleRef.resolve(BimResolver);
  });

  it('should return all bims', async () => {
    const result = await bimResolver.bims();
    expect(result).toHaveLength(bimsMock.length);
  });

  it('should select bim by id', async () => {
    const result = await bimResolver.bim(1);
    expect(result.id).toBe(1);
  });

  it('should return all entities from a bim', async () => {
    const result = await bimResolver.entities(bimsMock[0]);
    expect(result).toHaveLength(3);
  });

  it('should select an entity by id from a bim', async () => {
    const result = await bimResolver.entity(2, bimsMock[0]);
    expect(result.entityId).toEqual(2);
  });
});
