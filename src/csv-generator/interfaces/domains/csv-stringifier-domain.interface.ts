import stringify from 'csv-stringify';

export interface CsvStringifierDomainInterface {
  stringifyObjectToCSV(
    data: Record<string, string>[],
    withHeaders?: boolean,
  ): Promise<stringify.Stringifier>;
}
