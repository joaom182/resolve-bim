import { Test } from '@nestjs/testing';
import { BimRepository } from './bim.repository';
import { BimModule } from '../bim.module';
import { StorageModule } from '../../../modules/storage/storage.module';
import { LocalFileDbService } from '../../../modules/storage/local-file-db.service';
import { Bim } from '../models/bim.model';

describe('bim.repository', () => {
  let bimRepository: BimRepository;
  const localFileDbService: LocalFileDbService<Bim> = {
    load: async () => ({
      all: () => [
        {
          id: 1,
          modelDbUrl: 'http://test.url',
        },
        {
          id: 2,
          modelDbUrl: 'http://test_2.url',
        },
      ],
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BimModule, StorageModule],
    })
      .overrideProvider(LocalFileDbService<Bim>)
      .useValue(localFileDbService)
      .compile();

    bimRepository = await moduleRef.resolve(BimRepository);
  });

  it('should return all bims', async () => {
    const result = await bimRepository.getAll();
    expect(result).toHaveLength(2);
  });

  it('should select bim by id', async () => {
    const result = await bimRepository.getById(1);
    expect(result.id).toBe(1);
  });

  it(`should return null if bim doesn't exist`, async () => {
    const result = await bimRepository.getById(3);
    expect(result).toEqual(null);
  });
});
