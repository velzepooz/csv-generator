import { Module } from '@nestjs/common';
import { RandomGeneratorDomain } from './domain/random-generator.domain';

@Module({
  exports: [RandomGeneratorDomain],
  providers: [RandomGeneratorDomain],
})
export class RandomGeneratorModule {}
