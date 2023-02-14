export class AppException extends Error {
  constructor(message: string, readonly originalError?: Error) {
    super(message);
    if (originalError && originalError.stack) {
      this.stack ??= '';
      this.stack =
        this.stack.split('\n').slice(0, 2).join('\n') +
        '\n' +
        originalError.stack;
    }
  }
}

// Repository exceptions

export class RepositoryConflictException extends AppException {
  constructor(message: string, originalError?: Error) {
    super(message, originalError);
  }
}
