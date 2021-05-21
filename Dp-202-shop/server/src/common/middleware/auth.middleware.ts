import { IProductRequestSchema } from '../dtos/orders.dto';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Response } from 'express';
import { userService } from '../../modules/users/user.service';
import { NotFound } from '../errors/notFound';
import { Forbidden } from '../errors/forbidden';


export async function authMiddleware(req: ValidatedRequest<IProductRequestSchema>, res: Response, next: NextFunction): Promise<void> {
  const { phone, password } = req.headers;
  const foundUser = await userService.findUserByPhone(phone);
  if (foundUser.length === 0) {
    res.locals.isAuthenticated = false;
    next(new NotFound('Such phone number is not registered'));
  } else if (foundUser[0].password != password) {
    res.locals.isAuthenticated = false;
    next(new Forbidden('Incorrect password'));
  } else {
    res.locals.user = foundUser[0];
    res.locals.isAuthenticated = true;
    next();
  }
}
