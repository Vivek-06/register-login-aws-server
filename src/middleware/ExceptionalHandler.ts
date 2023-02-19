import { NextFunction, Request, Response } from 'express';
import Logger from '../utils/Logger';

const logger = new Logger('ExceptionalHandler');

const exceptionalHandler = (handler: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      logger.error(error.message, error, handler.name);
      next(error);
    }
  };
};

export default exceptionalHandler;
