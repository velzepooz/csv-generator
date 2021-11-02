import { TestingModule } from '@nestjs/testing';
import { CsvGeneratorDomain } from '../csv-generator.domain';
import { testAppModuleClass } from '../../../../test/factories';
import * as faker from 'faker';
import { getRandomInt } from '../../../../test/utils/random-number.util';
import { streamToData } from '../../../../test/utils/stream-to-file.util';

describe('On CsvGeneratorDomain', () => {
  let module: TestingModule, csvGeneratorDomain: CsvGeneratorDomain;

  beforeAll(async () => {
    module = await testAppModuleClass.getAppModule();
    csvGeneratorDomain = module.get<CsvGeneratorDomain>(CsvGeneratorDomain);
  });

  describe('On generateCsv', () => {
    let csvToCreate, prospectsNumber;
    beforeEach(() => {
      prospectsNumber = getRandomInt(1, 2);
      csvToCreate = {
        [faker.lorem.word()]: 'firstName',
        [faker.lorem.word()]: 'lastName',
        [faker.lorem.word()]: 'email',
        [faker.lorem.word()]: 'company',
        [faker.lorem.word()]: 'phone',
        [faker.lorem.word()]: 'mobilePhone',
        [faker.lorem.word()]: 'jobTitle',
        [faker.lorem.word()]: 'address',
        [faker.lorem.word()]: 'city',
        [faker.lorem.word()]: 'state',
        [faker.lorem.word()]: 'country',
        [faker.lorem.word()]: 'industry',
        [faker.lorem.word()]: 'website',
        [faker.lorem.word()]: 'facebookLink',
        [faker.lorem.word()]: 'twitterLink',
        [faker.lorem.word()]: 'linkedInLink',
        [faker.lorem.word()]: 'instagramInLink',
        [faker.lorem.word()]: 'stringType',
        [faker.lorem.word()]: 'numberType',
        [faker.lorem.word()]: 'dateType',
      };
    });

    it('Should return stream', async () => {
      const result = await csvGeneratorDomain.generateCsv(
        csvToCreate,
        prospectsNumber,
      );

      const csvToCreateFields = Object.keys(csvToCreate);
      const data = await streamToData(result);
      const csvString = data.split('\n');

      expect(csvString[0]).toEqual(csvToCreateFields.join(','));
      expect(csvString[1]).toBeDefined();
    });
  });
});
