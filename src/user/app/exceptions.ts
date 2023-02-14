import { AppException } from '@/common';

export class EmailIsTakenException extends AppException {
  constructor(message: string, originalError?: Error) {
    super(message, originalError);
  }
}
