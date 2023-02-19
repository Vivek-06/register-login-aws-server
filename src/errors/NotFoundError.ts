import { CustomError } from "./CustomError";
import ErrorCode from "./ErrorCode";
export default class NotFoundError extends CustomError {
  statusCode = 404;
  errorCode = ErrorCode.NOT_FOUND;
  constructor(public message: string = "Route not found") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
