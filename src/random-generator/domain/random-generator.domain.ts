import * as faker from 'faker';
import { Injectable } from '@nestjs/common';
import { RandomGeneratorDomainInterface } from '../interfaces/domains/random-generator-domain.interface';

@Injectable()
export class RandomGeneratorDomain implements RandomGeneratorDomainInterface {
  generateFirstName(): string {
    return faker.name.firstName();
  }

  generateLastName(): string {
    return faker.name.lastName();
  }

  generateEmail(): string {
    return faker.internet.email();
  }

  generateCompanyName(): string {
    return faker.company.companyName();
  }

  generatePhone(): string {
    return faker.phone.phoneNumberFormat();
  }

  generateMobilePhone(): string {
    return faker.phone.phoneNumberFormat();
  }

  generateJobTitle(): string {
    return faker.name.jobTitle();
  }

  generateAddress(): string {
    return faker.address.streetAddress();
  }

  generateCity(): string {
    return faker.address.city();
  }

  generateState(): string {
    return faker.address.state();
  }

  generateCountry(): string {
    return faker.address.country();
  }

  generateIndustry(): string {
    return faker.commerce.department();
  }

  generateWebsite(): string {
    return faker.internet.url();
  }

  generateFacebookLink(): string {
    return `https://www.facebook.com/${faker.random.word()}`;
  }

  generateTwitterLink(): string {
    return `https://twitter.com/${faker.random.word()}`;
  }

  generateLinkedInLink(): string {
    return `https://www.linkedin.com/in/${faker.random.word()}/`;
  }

  generateString(): string {
    return faker.random.words();
  }

  generateNumber(): string {
    return faker.datatype.number();
  }

  generateDate(): Date {
    return new Date();
  }
}
