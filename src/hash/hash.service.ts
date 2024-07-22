import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashService {
  createMD5Hash(input: string): string {
    return createHash('md5').update(input).digest('hex');
  }
}
