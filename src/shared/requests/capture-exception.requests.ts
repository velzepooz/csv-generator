import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { configService } from '../config/config.service';
import { RequestInterface } from '../interfaces/request.interface';

type captureExceptionParams = {
  err: Error | Record<string, any> | string;
  errorData?: Record<string, any>;
  req?: RequestInterface;
};
const logger = new Logger('CaptureExceptionRequests');

export class CaptureExceptionRequests {
  static async captureException({
    err,
    errorData,
    req,
  }: captureExceptionParams): Promise<void> {
    const { botToken, chatId } = configService.getTelegramCredentials();
    const message = `Error at service ${configService.getCustomKey('NODE_ENV')},
        ${
          errorData
            ? `errorData: ${JSON.stringify(_.omit(errorData, 'query'))}`
            : ''
        }
        url:${req?.url},
        req headers: ${JSON.stringify(_.get(req, 'headers', {}))},
        req query: ${JSON.stringify(_.get(req, 'query', {}))},
        req body: ${JSON.stringify(_.get(req, 'body', {}))},
        request failed with error: ${JSON.stringify(err)}`.slice(0, 4090);
    const url = encodeURI(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`,
    );
    try {
      await axios.get(url);
    } catch (e) {
      logger.error(e.message);
    }
  }
}
