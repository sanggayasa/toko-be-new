import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { IgnoreResponseInterceptorKey } from '../decorator/ignore-response.decorator';
import { ResponseMessageKey } from '../decorator/response.decorator';
import { serviceCode } from '../constant';

export interface Response<T> {
  responseCode: string;
  responseDesc: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage: {
      caseCode: string;
      message: string;
      additionalMessage: string;
    } = this.reflector.get<{
      caseCode: string;
      message: string;
      additionalMessage: string;
    }>(ResponseMessageKey, context.getHandler()) || {
      caseCode: '',
      message: '',
      additionalMessage: '',
    };

    const isIgnored = this.reflector.getAllAndOverride<boolean>(
      IgnoreResponseInterceptorKey,
      [context.getHandler(), context.getClass()],
    );

    if (isIgnored) {
      return next.handle();
    }
    console.log(serviceCode);
    return next.handle().pipe(
      map((data) => ({
        responseCode:
          context.switchToHttp().getResponse().statusCode.toString() +
          serviceCode +
          responseMessage.caseCode,
        responseDesc:
          responseMessage.message +
          (responseMessage.additionalMessage
            ? ' ' + responseMessage.additionalMessage
            : ''),
        data: data ? data : undefined,
      })),
    );
  }
}
