import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity } from './entity.model';

export interface IEntityProperties {
  [category: string]: {
    [property: string]: any;
  };
}

export interface IBim {
  id: number;
  modelDbUrl: string;
}

@ObjectType()
export class Bim implements IBim {
  @Field(() => Int)
  id: number;

  modelDbUrl: string;

  @Field(() => [Entity])
  entities: Entity[];

  @Field(() => Entity)
  entity: Entity;
}
