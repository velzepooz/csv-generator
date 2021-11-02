import { ErrorMessageInterface } from '../interfaces/error-message.interface';
import { errorsConstants } from '../errors.constants';

export class GeneralError extends Error {
  errorName: string;
  httpStatus: number;
  errorMessage: string;
  errorType: string;
  errorData: unknown;

  constructor(
    errorName: string,
    errorBody?: string,
    errorData?: Record<string, any> | Record<string, any>[],
  ) {
    super();

    const errorMessageConfig = this.getMessageFromMessageCode(
      errorName,
      errorBody,
    );
    if (!errorMessageConfig) {
      throw new Error('Unable to find message code error.');
    }

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorType = errorMessageConfig.type;
    this.errorName = errorName;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.message = errorMessageConfig.userMessage;
    this.errorData = errorData;
  }

  private getMessageFromMessageCode(
    messageCode: string,
    customBody?: string,
  ): ErrorMessageInterface {
    let errorData: ErrorMessageInterface | undefined;
    Object.keys(errorsConstants).some((key) => {
      if (key === messageCode) {
        errorData = { ...errorsConstants[key] };
        if (customBody) errorData.userMessage += customBody;
        return true;
      }
      return false;
    });

    if (!errorData) {
      throw new Error('Unable to find the given error.');
    }
    return errorData;
  }
}
