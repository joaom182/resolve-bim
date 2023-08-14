import { EntityTransformer } from './entity.transformer';

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
    attributeCategory: '__name__',
    attributeName: '',
    attributeValue: 'entity_name_test',
    attributeContext: '',
  },
  {
    entityId: 1,
    attributeCategory: 'category_test',
    attributeName: 'attribute_test_2',
    attributeValue: 'value_test_2',
    attributeContext: 'context_test',
  },
];

describe('entity.transformer', () => {
  const entityTransformer = new EntityTransformer();
  it('should transform IDBEntity[] to IEntity', () => {
    const entity = entityTransformer.transform(1, mockEntityProperties);
    expect(entity.entityId).toEqual(1);
    expect(entity.name).toEqual('entity_name_test');
    expect(entity.properties['category_test']['attribute_test_1']).toEqual(
      'value_test_1 context_test',
    );
    expect(entity.properties['category_test']['attribute_test_2']).toEqual(
      'value_test_2 context_test',
    );
  });

  it('should return null if an empty list of IDBEntity[] is provided', () => {
    const entity = entityTransformer.transform(1, []);
    expect(entity).toEqual(null);
  });

  it('should not return categories that starts with __ in the entity properties', () => {
    const entity = entityTransformer.transform(1, mockEntityProperties);
    const categories = Object.keys(entity.properties);
    expect(categories.every((c) => c.startsWith('__'))).toEqual(false);
  });
});
