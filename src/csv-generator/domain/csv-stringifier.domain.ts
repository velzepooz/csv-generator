import * as stringify from 'csv-stringify';
import { Injectable } from '@nestjs/common';
import { CsvStringifierDomainInterface } from '../interfaces/domains/csv-stringifier-domain.interface';

@Injectable()
export class CsvStringifierDomain implements CsvStringifierDomainInterface {
  async stringifyObjectToCSV(
    data: Record<string, string>[],
    withHeaders = true,
  ): Promise<stringify.Stringifier> {
    return stringify(data, { header: withHeaders });
  }
}
