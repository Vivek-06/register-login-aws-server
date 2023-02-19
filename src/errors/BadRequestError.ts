import { CustomError } from "./CustomError";
import ErrorCode from "./ErrorCode";
export default class BadRequestError extends CustomError {
  statusCode = 400;
  errorCode = ErrorCode.INVALID_REQUEST;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
