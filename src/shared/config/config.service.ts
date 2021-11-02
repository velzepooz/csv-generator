import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {
  ClassProvider,
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationPipeOptions,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExceptionFilter } from '../filters/general-code.filter';
import { ROUTES } from './routes';
import { ConfigServiceInterface } from '../interfaces/config-service.interface';
import * as fs from 'fs';

dotenv.config({ path: `env/${process.env.NODE_ENV || 'development'}.env` });

class ConfigService implements ConfigServiceInterface {
  constructor(private env: { [k: string]: string | undefined }) {}

  getPort(): number {
    return +this.getValue('PORT', true);
  }

  getCustomKey(key: string): string {
    return this.getValue(key, true);
  }

  getValidationOptions(transform?: true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      validateCustomDecorators: true,
    };
    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }
    return options;
  }

  configureApp(app: INestApplication): void {
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Content-Disposition',
      exposedHeaders: 'Content-Type, Content-Disposition',
    });
    app.setGlobalPrefix(ROUTES.MAIN_PATH);
    app.use(helmet());
    app.use(cookieParser());
    app.use(
      this.isProduction()
        ? morgan('tiny', {
            stream: fs.createWriteStream(`${__dirname}/logs/access.log`, {
              flags: 'a',
            }),
          })
        : morgan('tiny'),
    );
    app.use(bodyParser.json({ limit: '50mb' }));
    const options = new DocumentBuilder()
      .setTitle('CSV Generator REST API Docs')
      .setDescription('REST docs CSV Generator API')
      .addBearerAuth()
      .setVersion('1.0')
      .build();
    app.use(
      `${ROUTES.MAIN_PATH}/docs`,
      basicAuth({
        challenge: true,
        users: { gleb: this.getCustomKey('API_DOCS_PASS') },
      }),
    );
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${ROUTES.MAIN_PATH}/docs`, app, document, {
      swaggerOptions: {
        requestInterceptor: (req) => {
          req.credentials = 'include';
          return req;
        },
      },
    });
  }

  getTelegramCredentials(): { botToken: string; chatId: string } {
    return {
      botToken: this.getValue('TELEGRAM_BOT_TOKEN'),
      chatId: this.getValue('TELEGRAM_CHAT_ID'),
    };
  }

  provideFilters(): ClassProvider[] {
    return [
      {
        provide: APP_FILTER,
        useClass: GeneralExceptionFilter,
      },
    ];
  }

  isProduction(): boolean {
    const env = this.getValue('NODE_ENV', false);
    return env === 'production';
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return value;
  }
}

const configService = new ConfigService(process.env);

export { configService };
