import { IError, BaseError } from '../errors/baseError';
import { Request, Response } from 'express';

export function errorHandlerMiddleware(err: IError, req: Request, res: Response) {
  const status = err instanceof BaseError? err.statusCode : 500;
  return res.status(status).json({
      success: false,
      error: err.message || 'Server error',
      data: err.data
    });
}
