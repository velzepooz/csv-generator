import { HttpStatus } from '@nestjs/common';

export interface ErrorMessageInterface {
  type: string;
  httpStatus: HttpStatus;
  errorMessage: string;
  userMessage: string;
}
