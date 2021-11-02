export interface RandomGeneratorDomainInterface {
  generateFirstName(): string;
  generateLastName(): string;
  generateEmail(): string;
  generateCompanyName(): string;
  generatePhone(): string;
  generateMobilePhone(): string;
  generateJobTitle(): string;
  generateAddress(): string;
  generateCity(): string;
  generateState(): string;
  generateCountry(): string;
  generateIndustry(): string;
  generateWebsite(): string;
  generateFacebookLink(): string;
  generateTwitterLink(): string;
  generateLinkedInLink(): string;
  generateInstagramLink(): string
  generateString(): string;
  generateNumber(): string;
  generateDate(): Date;
}
