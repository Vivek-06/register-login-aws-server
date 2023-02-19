import { CustomError } from "./CustomError";
import ErrorCode from "./ErrorCode";
export default class UnauthorizedError extends CustomError {
  statusCode = 401;
  errorCode = ErrorCode.UNAUTHOURIZED;
  constructor(
    public message: string = "Unauthorized",
    public code: string = ErrorCode.UNAUTHOURIZED
  ) {
    super(message);
    this.errorCode = code;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Unauthorized" }];
  }
}
