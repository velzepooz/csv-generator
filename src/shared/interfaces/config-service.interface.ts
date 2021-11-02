import {
  ClassProvider,
  INestApplication,
  ValidationPipeOptions,
} from '@nestjs/common';

export interface ConfigServiceInterface {
  getPort(): number;
  getCustomKey(key: string): string;
  getValidationOptions(transform?: true): ValidationPipeOptions;
  configureApp(app: INestApplication): void;
  getTelegramCredentials(): { botToken: string; chatId: string };
  provideFilters(): ClassProvider[];
}
