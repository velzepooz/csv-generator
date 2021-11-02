import { ErrorMessageInterface } from './interfaces/error-message.interface';
import { HttpStatus } from '@nestjs/common';

export const errorsConstants: {
  [messageCode: string]: ErrorMessageInterface;
} = {
  'csvGenerator:NoFieldsProvided': {
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Please, provide fields',
    type: 'Bad Request',
    userMessage: 'Please, provide fields',
  },
};
