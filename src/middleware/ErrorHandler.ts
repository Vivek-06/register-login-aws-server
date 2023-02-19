import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import formatResponse from './FormatResponse';
import Logger from '../utils/Logger';
import { CustomError } from '../errors/CustomError';
import ErrorCode from '../errors/ErrorCode';

const logging = new Logger('ErrorHandler');

export const ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  logging.error(error.message, error);
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send(formatResponse(error.statusCode, true, error.errorCode, error.message, null));
  }
  if (error instanceof ValidationError) {
    return res
      .status(error.statusCode)
      .send(formatResponse(error.statusCode, true, null, JSON.stringify(error.details), null));
  }
  if (error.code === 'EBADCSRFTOKEN') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(
        formatResponse(StatusCodes.UNAUTHORIZED, true, ErrorCode.INVALID_CSRF_TOKEN, ReasonPhrases.UNAUTHORIZED, null)
      );
  }
  if (error.code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        formatResponse(StatusCodes.BAD_REQUEST, true, error.code, error.message || ReasonPhrases.BAD_REQUEST, null)
      );
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(formatResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, null, ReasonPhrases.INTERNAL_SERVER_ERROR, null));
};
