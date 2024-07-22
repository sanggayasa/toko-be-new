import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(
      `path: ${req.baseUrl} method: ${req.method} statusCode: ${res.statusCode}, statusMessage:${res.statusMessage}`,
    );
    console.log(
      `body: ${JSON.stringify(req.body)} params: ${JSON.stringify(req.params)}`,
    );
    next();
  }
}
