import { Module } from '@nestjs/common';
import { CsvGeneratorModule } from './csv-generator/csv-generator.module';
import { RandomGeneratorModule } from './random-generator/random-generator.module';
import { configService } from './shared/config/config.service';
import { CaptureExceptionRequests } from './shared/requests/capture-exception.requests';

@Module({
  imports: [CsvGeneratorModule, RandomGeneratorModule],
  controllers: [],
  providers: [CaptureExceptionRequests, ...configService.provideFilters()],
})
export class AppModule {}
