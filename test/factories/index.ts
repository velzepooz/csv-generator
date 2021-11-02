import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../../src/app.module';
import { GeneralExceptionFilter } from '../../src/shared/filters/general-code.filter';

class TestAppModuleClass {
  app: INestApplication;
  module: TestingModule;

  private async createAppModule(): Promise<void> {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();
    this.app = this.module
      .createNestApplication()
      .useGlobalFilters(new GeneralExceptionFilter());
    this.app.use(cookieParser());
    await this.app.init();
  }

  async getAppModule(): Promise<TestingModule> {
    if (this.module) return this.module;
    await this.createAppModule();
    return this.module;
  }
}

export const testAppModuleClass = new TestAppModuleClass();
