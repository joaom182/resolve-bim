import { Test } from '@nestjs/testing';
import { StorageModule } from '../../../modules/storage/storage.module';
import { BimModule } from '../bim.module';
import { BimRepository } from '../repositories/bim.repository';
import { BimService } from './bim.service';

describe('bim.service', () => {
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
  let bimService: BimService;
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
      .compile();

    bimService = await moduleRef.resolve(BimService);
  });

  it('should return all bims', async () => {
    const result = await bimService.getAll();
    expect(result).toHaveLength(2);
  });

  it('should select bim by id', async () => {
    const result = await bimService.getById(1);
    expect(result.id).toBe(1);
  });

  it(`should return null if bim doesn't exist`, async () => {
    const result = await bimService.getById(3);
    expect(result).toEqual(null);
  });
});
