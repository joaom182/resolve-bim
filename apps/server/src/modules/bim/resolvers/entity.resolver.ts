import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Entity } from '../models/entity.model';
import { EntityService } from '../services/entity.service';

@Resolver(() => Entity)
export class EntityResolver {
  constructor(private entityService: EntityService) {}

  @Query(() => [Entity])
  async entities(@Args('bimId', { type: () => Int }) bimId: number) {
    return this.entityService.getAll(bimId);
  }

  @Query(() => Entity, { nullable: true })
  async entity(
    @Args('id', { type: () => Int }) id: number,
    @Args('bimId', { type: () => Int }) bimId: number,
  ) {
    return this.entityService.getById(id, bimId);
  }
}
