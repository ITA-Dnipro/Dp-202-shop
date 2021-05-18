import { IProductRequestSchema } from '../../modules/orders/order.schema';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Response } from 'express';
import { userModel } from '../../modules/users/user.model';
import { ApiError } from '../errors/api-errors';


export async function authMiddleware(req: ValidatedRequest<IProductRequestSchema>, res: Response, next: NextFunction): Promise<void> {
  const { login, password } = req.headers;
  try {
    const user = await userModel.getOne(login, password);
    res.locals.user = user;
    res.locals.isAuthentificated = !!user;
    next();
  } catch (e) {
    next(ApiError.internal(e.message));
  }
}
