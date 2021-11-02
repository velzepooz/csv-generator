import { TestingModule } from '@nestjs/testing';
import { testAppModuleClass } from '../../../../test/factories';
import { RandomGeneratorDomain } from '../random-generator.domain';

describe('On RandomGeneratorDomain ', () => {
  let module: TestingModule, randomGeneratorDomain: RandomGeneratorDomain;

  beforeAll(async () => {
    module = await testAppModuleClass.getAppModule();
    randomGeneratorDomain = module.get<RandomGeneratorDomain>(
      RandomGeneratorDomain,
    );
  });

  describe('On generateFirstName', () => {
    it('Should return random string', () => {
      const result = randomGeneratorDomain.generateFirstName();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateLastName', () => {
    it('Should return random string', () => {
      const result = randomGeneratorDomain.generateLastName();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateEmail', () => {
    it('Should return random email', () => {
      const result = randomGeneratorDomain.generateEmail();

      expect(result).toBeDefined();
      expect(result).toContain('@');
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateCompanyName', () => {
    it('Should return random company name', () => {
      const result = randomGeneratorDomain.generateEmail();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generatePhone', () => {
    it('Should return random phone', () => {
      const result = randomGeneratorDomain.generatePhone();

      expect(result).toBeDefined();
      expect(result).toMatch(/[0-9]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateMobilePhone', () => {
    it('Should return random phone', () => {
      const result = randomGeneratorDomain.generateMobilePhone();

      expect(result).toBeDefined();
      expect(result).toMatch(/[0-9]+/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateJobTitle', () => {
    it('Should return random job title', () => {
      const result = randomGeneratorDomain.generateJobTitle();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateAddress', () => {
    it('Should return random adress', () => {
      const result = randomGeneratorDomain.generateAddress();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateCity', () => {
    it('Should return random city', () => {
      const result = randomGeneratorDomain.generateCity();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateState', () => {
    it('Should return random state', () => {
      const result = randomGeneratorDomain.generateState();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateCountry', () => {
    it('Should return random country', () => {
      const result = randomGeneratorDomain.generateCountry();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateIndustry', () => {
    it('Should return random industry', () => {
      const result = randomGeneratorDomain.generateIndustry();

      expect(result).toBeDefined();
      expect(result.slice(0, 1)).toMatch(/[A-Z]/);
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateWebsite', () => {
    it('Should return random website', () => {
      const result = randomGeneratorDomain.generateWebsite();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateFacebookLink', () => {
    it('Should return random facebook link', () => {
      const result = randomGeneratorDomain.generateFacebookLink();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateTwitterLink', () => {
    it('Should return random twitter link', () => {
      const result = randomGeneratorDomain.generateTwitterLink();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateLinkedInLink', () => {
    it('Should return random linkedIn link', () => {
      const result = randomGeneratorDomain.generateLinkedInLink();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateInstagramLink', () => {
    it('Should return random instagram link', () => {
      const result = randomGeneratorDomain.generateInstagramLink();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateString', () => {
    it('Should return random string', () => {
      const result = randomGeneratorDomain.generateLinkedInLink();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('On generateNumber', () => {
    it('Should return random number', () => {
      const result = randomGeneratorDomain.generateNumber();

      expect(result).toBeDefined();
      expect(typeof result).toBe('number');
    });
  });

  describe('On generateDate', () => {
    it('Should return random date', () => {
      const result = randomGeneratorDomain.generateDate();

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });
});
