import { Module } from '@nestjs/common';
import { CsvGeneratorController } from './controllers/csv-generator.controller';
import { CsvGeneratorService } from './services/csv-generator.service';
import { RandomGeneratorModule } from '../random-generator/random-generator.module';
import { CsvGeneratorDomain } from './domain/csv-generator.domain';
import { CsvStringifierDomain } from './domain/csv-stringifier.domain';

@Module({
  controllers: [CsvGeneratorController],
  providers: [CsvGeneratorService, CsvGeneratorDomain, CsvStringifierDomain],
  imports: [RandomGeneratorModule],
})
export class CsvGeneratorModule {}
