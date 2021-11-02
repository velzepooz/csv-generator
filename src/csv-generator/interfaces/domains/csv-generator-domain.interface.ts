import stringify from 'csv-stringify';

export interface CsvGeneratorDomainInterface {
  generateCsv(
    fields: Record<string, string>,
    numberOfClients: number,
  ): Promise<stringify.Stringifier>;
}
