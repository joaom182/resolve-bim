import { Injectable } from '@nestjs/common';
import { IBim } from '../models/bim.model';
import { BimRepository } from '../repositories/bim.repository';

@Injectable()
export class BimService {
  constructor(private readonly bimRepository: BimRepository) {
    this.bimRepository = bimRepository;
  }

  async getAll(): Promise<IBim[]> {
    return this.bimRepository.getAll();
  }

  async getById(id: number): Promise<IBim> {
    return this.bimRepository.getById(id);
  }
}
