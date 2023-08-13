import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { IEntity } from '../models/entity.model';
import { BimRepository } from '../repositories/bim.repository';
import { EntityRepository } from '../repositories/entity.repository';
import { EntityTransformer } from '../transformers/entity.transformer';

@Injectable()
export class EntityService {
  constructor(
    private entityRepository: EntityRepository,
    private bimRepository: BimRepository,
    private entityTransformer: EntityTransformer,
  ) {}

  async getAll(bimId: number): Promise<IEntity[]> {
    const bim = await this.bimRepository.getById(bimId);
    if (!bim) return [];
    const dbEntities = await this.entityRepository.getAll(bim.modelDbUrl);
    const hashTable = _.groupBy(dbEntities, 'entityId');
    const transformer = (entityId) =>
      this.entityTransformer.transform(parseInt(entityId), hashTable[entityId]);
    return Object.keys(hashTable).map(transformer);
  }

  async getById(id: number, bimId: number): Promise<IEntity> {
    const bim = await this.bimRepository.getById(bimId);
    const entityProperties = await this.entityRepository.getById(
      id,
      bim.modelDbUrl,
    );
    return this.entityTransformer.transform(id, entityProperties);
  }
}
