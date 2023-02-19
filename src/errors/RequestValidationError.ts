import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";
import ErrorCode from "./ErrorCode";
export default class RequestValidationError extends CustomError {
  statusCode = 400;
  errorCode = ErrorCode.INVALID_REQUEST;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
