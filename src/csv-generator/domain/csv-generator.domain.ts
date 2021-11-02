/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as stringify from 'csv-stringify';
import { RandomGeneratorDomain } from '../../random-generator/domain/random-generator.domain';
import { CsvGeneratorDomainInterface } from '../interfaces/domains/csv-generator-domain.interface';
import { CsvStringifierDomain } from "./csv-stringifier.domain";
import { GeneralError } from '../../shared/errors/general-error';

@Injectable()
export class CsvGeneratorDomain implements CsvGeneratorDomainInterface {
  private _fieldsMapping = {
    firstName: () => this._randomGeneratorDomain.generateFirstName(),
    lastName: () => this._randomGeneratorDomain.generateLastName(),
    email: () => this._randomGeneratorDomain.generateEmail(),
    company: () => this._randomGeneratorDomain.generateCompanyName(),
    phone: () => this._randomGeneratorDomain.generatePhone(),
    mobilePhone: () => this._randomGeneratorDomain.generateMobilePhone(),
    jobTitle: () => this._randomGeneratorDomain.generateJobTitle(),
    address: () => this._randomGeneratorDomain.generateAddress(),
    city: () => this._randomGeneratorDomain.generateCity(),
    state: () => this._randomGeneratorDomain.generateState(),
    country: () => this._randomGeneratorDomain.generateCountry(),
    industry: () => this._randomGeneratorDomain.generateIndustry(),
    website: () => this._randomGeneratorDomain.generateWebsite(),
    facebookLink: () => this._randomGeneratorDomain.generateFacebookLink(),
    twitterLink: () => this._randomGeneratorDomain.generateTwitterLink(),
    linkedInLink: () => this._randomGeneratorDomain.generateLinkedInLink(),
    stringType: () => this._randomGeneratorDomain.generateString(),
    numberType: () => this._randomGeneratorDomain.generateNumber(),
    dateType: () => this._randomGeneratorDomain.generateDate(),
  };

  constructor(
    private readonly _randomGeneratorDomain: RandomGeneratorDomain,
    private readonly _csvStringifierDomain: CsvStringifierDomain,
  ) {}

  async generateCsv(
    fields: Record<string, string>,
    numberOfClients: number,
  ): Promise<stringify.Stringifier> {
    if (!Object.values(fields).length) {
      throw new GeneralError('csvGenerator:NoFieldsProvided');
    }

    const clients = this._createRecords(fields, numberOfClients);
    return this._csvStringifierDomain.stringifyObjectToCSV(clients);
  }

  private _createRecords(
    fields: Record<string, string>,
    numberOfClients: number,
  ): Record<string, string>[] {
    const clients = [];
    let number = 0;

    while (number < numberOfClients) {
      const tempProspect = {};

      for (const [customFieldName, systemFieldName] of Object.entries(fields)) {
        tempProspect[customFieldName] = typeof this._fieldsMapping[systemFieldName] === 'function'
          ? this._fieldsMapping[systemFieldName]()
          : '';
      }

      clients.push({ ...tempProspect });
      number++;
    }

    return clients;
  }
}
