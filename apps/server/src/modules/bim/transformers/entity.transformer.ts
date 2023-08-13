import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { IEntity } from '../models/entity.model';
import { IDBEntity } from '../repositories/entity.repository';

@Injectable()
export class EntityTransformer {
  transform(entityId: number, dbEntityProperties: IDBEntity[]): IEntity {
    const categories = _.groupBy(dbEntityProperties, 'attributeCategory');
    const publicCategories = Object.keys(categories).filter(
      (c) => !c?.startsWith('__'),
    );

    const properties = publicCategories.reduce((acc, category) => {
      const categoryProperties = categories[category].reduce(
        (acc, property) => {
          acc[property.attributeName] = `${property.attributeValue}${
            property.attributeContext ? ` ${property.attributeContext}` : ''
          }`;
          return acc;
        },
        {},
      );
      acc[category] = categoryProperties;
      return acc;
    }, {});

    const name = categories?.['__name__']?.[0]?.attributeValue || '';

    return {
      entityId,
      name,
      properties,
    };
  }
}
