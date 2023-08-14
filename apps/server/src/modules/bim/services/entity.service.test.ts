import { Test } from '@nestjs/testing';
import { StorageModule } from '../../storage/storage.module';
import { BimModule } from '../bim.module';
import { BimRepository } from '../repositories/bim.repository';
import { EntityRepository } from '../repositories/entity.repository';
import { EntityService } from './entity.service';

describe('entity.service', () => {
  const mockBims = [
    {
      id: 1,
      modelDbUrl: 'http://test.url',
    },
    {
      id: 2,
      modelDbUrl: 'http://test_2.url',
    },
  ];
  const mockEntityProperties = [
    {
      entityId: 1,
      attributeCategory: 'category_test',
      attributeName: 'attribute_test_1',
      attributeValue: 'value_test_1',
      attributeContext: 'context_test',
    },
    {
      entityId: 1,
      attributeCategory: 'category_test',
      attributeName: 'attribute_test_2',
      attributeValue: 'value_test_2',
      attributeContext: 'context_test',
    },
    {
      entityId: 2,
      attributeCategory: 'category_test',
      attributeName: 'attribute_test_1',
      attributeValue: 'value_test',
      attributeContext: 'context_test',
    },
  ];
  let entityService: EntityService;
  const entityRepository: EntityRepository = {
    getAll: jest.fn().mockResolvedValue(mockEntityProperties),
    getById: jest
      .fn()
      .mockImplementation((id) =>
        mockEntityProperties.filter((e) => e.entityId == id),
      ),
  } as any;
  const bimRepository: BimRepository = {
    getAll: jest.fn().mockResolvedValue(mockBims),
    getById: jest
      .fn()
      .mockImplementation((id: number) => mockBims.find((b) => b.id === id)),
  } as any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BimModule, StorageModule],
    })
      .overrideProvider(BimRepository)
      .useValue(bimRepository)
      .overrideProvider(EntityRepository)
      .useValue(entityRepository)
      .compile();

    entityService = await moduleRef.resolve(EntityService);
  });

  it('should return all entities from a bim', async () => {
    const entities = await entityService.getAll(1);
    expect(entities).toHaveLength(2);
  });

  it(`should not return entities if bim doesn't exist`, async () => {
    const entities = await entityService.getAll(11);
    expect(entities).toHaveLength(0);
  });

  it('should return an entity with its properties', async () => {
    const entity = await entityService.getById(1, 1);
    expect(entity.entityId).toEqual(1);
    expect(entity.properties['category_test']['attribute_test_1']).toEqual(
      'value_test_1 context_test',
    );
    expect(entity.properties['category_test']['attribute_test_2']).toEqual(
      'value_test_2 context_test',
    );
  });

  it(`should not return an entity if bim doesn't exist`, async () => {
    const entity = await entityService.getById(1, 11);
    expect(entity).toEqual(null);
  });

  it(`should not return an entity if entity doesn't exist`, async () => {
    const entity = await entityService.getById(22, 1);
    expect(entity).toEqual(null);
  });
});
