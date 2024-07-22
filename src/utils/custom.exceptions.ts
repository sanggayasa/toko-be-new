import { HttpException } from '@nestjs/common';
import { serviceCode } from './constant';

export class ErrorException extends HttpException {
  constructor(
    { caseCode, message },
    additionalMessage = '',
  ) {
    super(
      {
        responseCode: '500' + serviceCode + caseCode,
        responseDesc: `${message}${
          additionalMessage ? `: ${additionalMessage}` : ''
        }`,
      },
      '500',
    );
  }
}
