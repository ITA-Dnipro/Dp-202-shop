import { ApiError } from '../errors/api-errors';
import { Request, Response } from 'express';

export function errorHandlerMiddleware(err: Error | ApiError, req: Request, res: Response) {
  const status = err instanceof ApiError ? err.status : 500;
  return res.status(status).json(err.message);
}
