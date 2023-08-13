import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

export interface IEntityProperties {
  [category: string]: {
    [property: string]: any;
  };
}

export interface IEntity {
  entityId: number;
  name: string;
  properties: object;
}

@ObjectType()
export class Entity implements IEntity {
  @Field(() => Int)
  entityId: number;

  @Field({ nullable: false })
  name: string;

  @Field(() => GraphQLJSON)
  properties: JSON | object;
}
