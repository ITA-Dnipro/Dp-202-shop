import {IError} from '../errors/baseError';
import {Request, Response, NextFunction} from 'express';

export default (err: IError, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status || 500).json({
    success: false,
    error: err.error || 'Server error',
    data: err.data
  });
};
