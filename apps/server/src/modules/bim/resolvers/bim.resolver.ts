import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Bim } from '../models/bim.model';
import { BimService } from '../services/bim.service';
import { EntityResolver } from './entity.resolver';
import { Entity } from '../models/entity.model';

@Resolver(() => Bim)
export class BimResolver {
  constructor(
    private bimService: BimService,
    private entityResolver: EntityResolver,
  ) {}

  @Query(() => [Bim])
  async bims() {
    return this.bimService.getAll();
  }

  @Query(() => Bim)
  async bim(@Args('id', { type: () => Int }) id: number) {
    return this.bimService.getById(id);
  }

  @ResolveField()
  async entities(@Parent() bim: Bim) {
    return this.entityResolver.entities(bim.id);
  }

  @ResolveField(() => Entity, { nullable: true })
  async entity(
    @Args('id', { type: () => Int }) id: number,
    @Parent() bim: Bim,
  ) {
    return this.entityResolver.entity(id, bim.id);
  }
}
