import { HttpException } from '@nestjs/common';
import { serviceCode } from './constant';

export class ErrorException extends HttpException {
  constructor({ httpStatus=500, caseCode='', message='' }, additionalMessage = '') {
    super(
      {
        responseCode: httpStatus + serviceCode + caseCode,
        responseDesc: `${message}${
          additionalMessage ? `: ${additionalMessage}` : ''
        }`,
      },
      httpStatus,
    );
  }
}
