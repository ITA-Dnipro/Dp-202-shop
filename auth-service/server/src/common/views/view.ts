import { Response } from 'express';
import { ApiError } from '../errors/api-errors';

export class BaseView {

  public static buildSuccessView(res: Response, data: any): Response {
    const response = {
      status: 'ok',
      data,
      message: ''
    };

    return res.json(response);
  }

  public static buildErrorView(res: Response, error: Error | ApiError): Response {
    const response = {
      status: 'fail',
      data: [],
      message: error.message
    };
    const status = error instanceof ApiError ? error.status : 500;

    return res.status(status).json(response);
  }
}
