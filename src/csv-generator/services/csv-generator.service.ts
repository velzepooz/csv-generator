import { Injectable } from '@nestjs/common';
import { CsvGeneratorDomain } from '../domain/csv-generator.domain';
import * as stringify from 'csv-stringify';
import { generateClientsType } from '../types/generate-clients.type';

@Injectable()
export class CsvGeneratorService {
  constructor(private readonly _csvGeneratorDomain: CsvGeneratorDomain) {}

  async generateCsv(
    data: generateClientsType,
  ): Promise<Promise<stringify.Stringifier>> {
    return this._csvGeneratorDomain.generateCsv(
      data.fields,
      data.numberOfClients,
    );
  }
}
