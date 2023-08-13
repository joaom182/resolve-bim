import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { BimRepository } from './repositories/bim.repository';
import { EntityRepository } from './repositories/entity.repository';
import { BimResolver } from './resolvers/bim.resolver';
import { EntityResolver } from './resolvers/entity.resolver';
import { BimService } from './services/bim.service';
import { EntityService } from './services/entity.service';
import { EntityTransformer } from './transformers/entity.transformer';

@Module({
  imports: [StorageModule],
  providers: [
    EntityService,
    EntityTransformer,
    EntityResolver,
    EntityRepository,
    BimService,
    BimResolver,
    BimRepository,
  ],
})
export class BimModule {}
